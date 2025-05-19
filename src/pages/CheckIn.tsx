
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, UserPlus } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { guestsData } from '@/lib/mock-data';
import CheckInStatusSelector from '@/components/check-in/CheckInStatusSelector';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CheckInStatus = 'Reserved' | 'Checked In' | 'Confirmed' | 'No Show';

const CheckIn = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // This would call vw_GuestSmartLookup in production
    const results = guestsData.filter(guest => 
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.includes(searchTerm)
    );
    setSearchResults(results);
  };

  const handleStatusChange = (guestId: string, newStatus: CheckInStatus) => {
    // Update the guest status in our state
    setSearchResults(prev => 
      prev.map(guest => guest.id === guestId ? {...guest, status: newStatus} : guest)
    );
    
    // Show a toast notification
    toast({
      title: "Guest Status Updated",
      description: `Guest ${guestId} status changed to ${newStatus}.`,
    });
  };

  const handleNewWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const guestName = formData.get('guestName') as string;
    
    toast({
      title: "Walk-in Guest Created",
      description: `${guestName} has been registered as a walk-in guest.`
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Check In</h1>
            <p className="text-muted-foreground">Process guest check-ins and manage arrivals.</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-hotel-primary hover:bg-hotel-dark">
                <UserPlus className="mr-2 h-4 w-4" />
                New Walk-in
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register Walk-in Guest</DialogTitle>
                <DialogDescription>
                  Enter the details for the new walk-in guest.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleNewWalkIn} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label htmlFor="guestName" className="text-sm font-medium">Guest Name</label>
                  <Input id="guestName" name="guestName" placeholder="Enter guest name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="guestEmail" className="text-sm font-medium">Email Address</label>
                  <Input id="guestEmail" name="guestEmail" type="email" placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="guestPhone" className="text-sm font-medium">Phone Number</label>
                  <Input id="guestPhone" name="guestPhone" placeholder="Enter phone number" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="roomType" className="text-sm font-medium">Room Type</label>
                  <select 
                    id="roomType" 
                    name="roomType"
                    className="w-full border border-input bg-background px-3 py-2 rounded-md"
                    required
                  >
                    <option value="">Select room type</option>
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                    <option value="presidential">Presidential Suite</option>
                  </select>
                </div>
                <DialogFooter>
                  <Button type="submit">Register Guest</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Guest Lookup</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
            
            {searchResults.length > 0 && (
              <div className="mt-4 border rounded-lg divide-y">
                {searchResults.map((guest) => (
                  <div key={guest.id} className="p-4 flex justify-between items-center">
                    <div>
                      <div className="font-medium">{guest.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {guest.email} • {guest.phone}
                      </div>
                      <div className="flex gap-2 mt-1">
                        <CheckInStatusSelector 
                          currentStatus={guest.status}
                          guestId={guest.id}
                          onStatusChange={handleStatusChange}
                        />
                        
                        {guest.vip && (
                          <span className="bg-hotel-accent/20 text-hotel-dark text-xs px-2 py-1 rounded-full">
                            VIP
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {searchTerm && searchResults.length === 0 && (
              <div className="mt-4 text-center py-10 border rounded-lg">
                <p className="text-muted-foreground">No guests found matching your search criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CheckIn;
