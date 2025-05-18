
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, UserPlus, Award } from "lucide-react";
import { guestsData } from '@/lib/mock-data';

const Guests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGuests, setFilteredGuests] = useState(guestsData);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // This would use vw_GuestSmartLookup in production
    const filtered = guestsData.filter(guest => 
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.includes(searchTerm)
    );
    setFilteredGuests(filtered);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Guests</h1>
            <p className="text-muted-foreground">Manage guest information and profiles.</p>
          </div>
          <Button className="bg-hotel-primary hover:bg-hotel-dark">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Guest
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <form onSubmit={handleSearch} className="flex gap-2 flex-1">
                <Input
                  placeholder="Search guests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </form>
              
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Loyalty</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGuests.map((guest) => (
                    <TableRow key={guest.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{guest.name}</div>
                          <div className="text-sm text-muted-foreground">{guest.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          guest.status === 'Checked In' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {guest.status}
                        </span>
                      </TableCell>
                      <TableCell>{guest.roomNumber}</TableCell>
                      <TableCell>{guest.checkIn}</TableCell>
                      <TableCell>{guest.checkOut}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Award className={`h-4 w-4 mr-1 ${
                            guest.loyaltyTier === 'Diamond' ? 'text-blue-500' : 'text-yellow-500'
                          }`} />
                          {guest.loyaltyTier}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-hotel-secondary hover:text-white hover:bg-hotel-secondary"
                          >
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredGuests.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No guests found.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Guests;
