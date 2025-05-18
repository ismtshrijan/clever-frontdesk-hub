
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DoorClosed, Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { roomTypesData } from '@/lib/mock-data';

// Sample room data
const roomsData = [
  { 
    number: "101", 
    type: "Standard", 
    status: "Occupied", 
    guest: "Emma Thompson",
    checkIn: "2023-05-15", 
    checkOut: "2023-05-20", 
    housekeeping: "Clean" 
  },
  { 
    number: "102", 
    type: "Standard", 
    status: "Available", 
    guest: null,
    checkIn: null, 
    checkOut: null, 
    housekeeping: "Clean" 
  },
  { 
    number: "201", 
    type: "Deluxe", 
    status: "Occupied", 
    guest: "Michael Jordan",
    checkIn: "2023-05-16", 
    checkOut: "2023-05-22", 
    housekeeping: "Clean" 
  },
  { 
    number: "301", 
    type: "Suite", 
    status: "Maintenance", 
    guest: null,
    checkIn: null, 
    checkOut: null, 
    housekeeping: "Maintenance" 
  },
  { 
    number: "401", 
    type: "Presidential Suite", 
    status: "Available", 
    guest: null,
    checkIn: null, 
    checkOut: null, 
    housekeeping: "Clean" 
  }
];

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRooms, setFilteredRooms] = useState(roomsData);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // This would use a proper database query in production
    const filtered = roomsData.filter(room => 
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.guest && room.guest.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredRooms(filtered);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rooms</h1>
          <p className="text-muted-foreground">
            Manage room availability, status, and assignments.
          </p>
        </div>
        
        {/* Room Type Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roomTypesData.map((type, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{type.type}</p>
                    <h3 className="text-2xl font-bold mt-1">{type.available}/{type.total}</h3>
                    <p className="text-xs mt-1">
                      <span className="text-green-500">{type.available} Available</span> • 
                      <span className="text-blue-500 ml-1">{type.occupied} Occupied</span>
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-hotel-primary/10 flex items-center justify-center text-hotel-primary">
                    <DoorClosed className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Room List */}
        <Card>
          <CardHeader>
            <CardTitle>Room List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <form onSubmit={handleSearch} className="flex gap-2 flex-1">
                <Input
                  placeholder="Search by room number or guest name..."
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
                    <TableHead>Room</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Housekeeping</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRooms.map((room) => (
                    <TableRow key={room.number}>
                      <TableCell className="font-medium">{room.number}</TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>
                        <Badge className={
                          room.status === 'Available' ? "bg-green-100 text-green-800" :
                          room.status === 'Occupied' ? "bg-blue-100 text-blue-800" :
                          room.status === 'Maintenance' ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }>
                          {room.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{room.guest || "-"}</TableCell>
                      <TableCell>{room.checkIn || "-"}</TableCell>
                      <TableCell>{room.checkOut || "-"}</TableCell>
                      <TableCell>
                        <Badge className={
                          room.housekeeping === 'Clean' ? "bg-green-100 text-green-800" :
                          room.housekeeping === 'Dirty' ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }>
                          {room.housekeeping}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredRooms.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No rooms found.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Rooms;
