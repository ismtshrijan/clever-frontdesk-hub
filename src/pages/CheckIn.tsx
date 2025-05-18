
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, UserPlus } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { guestsData } from '@/lib/mock-data';

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

  const handleCheckIn = (guestId: string) => {
    // This would call sp_SmartCheckIn in production
    toast({
      title: "Guest Checked In",
      description: `Guest ID: ${guestId} has been successfully checked in.`
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
          <Button className="bg-hotel-primary hover:bg-hotel-dark">
            <UserPlus className="mr-2 h-4 w-4" />
            New Walk-in
          </Button>
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
                        {guest.status === 'Reserved' ? (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Reserved
                          </span>
                        ) : (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {guest.status}
                          </span>
                        )}
                        {guest.vip && (
                          <span className="bg-hotel-accent/20 text-hotel-dark text-xs px-2 py-1 rounded-full">
                            VIP
                          </span>
                        )}
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleCheckIn(guest.id)}
                      disabled={guest.status !== 'Reserved'}
                      className="bg-hotel-primary hover:bg-hotel-dark"
                    >
                      Check In
                    </Button>
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
