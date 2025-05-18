
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, Edit, Trash2, CheckSquare, ClipboardList } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Sample rooms data
const roomsData = [
  {
    id: "101",
    type: "Standard",
    beds: "1 Queen",
    floor: "1",
    status: "Occupied",
    guestName: "Thomas Anderson",
    cleaningStatus: "Clean",
    price: "$129/night"
  },
  {
    id: "102",
    type: "Standard",
    beds: "2 Twin",
    floor: "1",
    status: "Available",
    guestName: "",
    cleaningStatus: "Clean",
    price: "$129/night"
  },
  {
    id: "201",
    type: "Deluxe",
    beds: "1 King",
    floor: "2",
    status: "Available",
    guestName: "",
    cleaningStatus: "Clean",
    price: "$199/night"
  },
  {
    id: "301",
    type: "Suite",
    beds: "1 King + Sofa",
    floor: "3",
    status: "Occupied",
    guestName: "Jennifer Lawrence",
    cleaningStatus: "Clean",
    price: "$299/night"
  },
  {
    id: "401",
    type: "Presidential",
    beds: "1 King + 2 Queen",
    floor: "4",
    status: "Available",
    guestName: "",
    cleaningStatus: "Needs Cleaning",
    price: "$499/night"
  }
];

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRooms, setFilteredRooms] = useState(roomsData);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = roomsData.filter(
      room => 
        room.id.includes(searchTerm) ||
        room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.guestName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRooms(filtered);
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Room Created",
      description: "New room has been successfully added to the system.",
    });
  };

  const handleStatusChange = (roomId: string, newStatus: string) => {
    toast({
      title: "Room Status Updated",
      description: `Room ${roomId} status changed to ${newStatus}.`,
    });
  };

  const handleCleaningRequest = (roomId: string) => {
    toast({
      title: "Cleaning Request Submitted",
      description: `Cleaning request submitted for Room ${roomId}.`,
    });
  };

  const roomStatusColors: Record<string, string> = {
    'Available': 'bg-green-100 text-green-800',
    'Occupied': 'bg-blue-100 text-blue-800',
    'Maintenance': 'bg-red-100 text-red-800',
    'Reserved': 'bg-yellow-100 text-yellow-800',
    'Clean': 'bg-green-100 text-green-800',
    'Needs Cleaning': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rooms</h1>
            <p className="text-muted-foreground">
              Manage hotel rooms and their status
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-hotel-primary hover:bg-hotel-dark">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Room
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Room</DialogTitle>
                <DialogDescription>
                  Enter the details for the new room.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateRoom} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="roomNumber" className="text-sm font-medium">Room Number</label>
                    <Input id="roomNumber" placeholder="e.g. 101" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="roomType" className="text-sm font-medium">Room Type</label>
                    <Input id="roomType" placeholder="e.g. Standard" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="beds" className="text-sm font-medium">Beds</label>
                    <Input id="beds" placeholder="e.g. 1 Queen" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="price" className="text-sm font-medium">Price per Night</label>
                    <Input id="price" placeholder="e.g. $129" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Room</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Room Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
                  <h3 className="text-2xl font-bold mt-1">{roomsData.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {roomsData.filter(room => room.status === 'Available').length}
                  </h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                  <CheckSquare className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Occupied</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {roomsData.filter(room => room.status === 'Occupied').length}
                  </h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <CheckSquare className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Needs Cleaning</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {roomsData.filter(room => room.cleaningStatus === 'Needs Cleaning').length}
                  </h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <ClipboardList className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rooms List */}
        <Card>
          <CardHeader>
            <CardTitle>All Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
              <Input
                placeholder="Search rooms by number, type, status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
            
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Beds</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Cleaning</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell>{room.id}</TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>{room.beds}</TableCell>
                      <TableCell>
                        <Badge className={roomStatusColors[room.status]}>
                          {room.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {room.guestName || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge className={roomStatusColors[room.cleaningStatus]}>
                          {room.cleaningStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{room.price}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {room.status === 'Available' ? (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleStatusChange(room.id, 'Reserved')}
                            >
                              Reserve
                            </Button>
                          ) : room.status === 'Occupied' ? (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleStatusChange(room.id, 'Available')}
                            >
                              Checkout
                            </Button>
                          ) : null}
                          
                          {room.cleaningStatus === 'Clean' ? (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCleaningRequest(room.id)}
                            >
                              Request Cleaning
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleStatusChange(room.id, 'Clean')}
                            >
                              Mark Clean
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredRooms.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No rooms found matching your criteria.</p>
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
