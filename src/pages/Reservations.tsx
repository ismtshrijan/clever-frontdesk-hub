import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, Calendar, Edit, Trash2, Check } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import PaymentStatusSelector from "@/components/reservations/PaymentStatusSelector";
import StatusSelector from "@/components/reservations/StatusSelector";

// Sample reservation data
const reservationsData = [
  {
    id: "RES1001",
    guestName: "Michael Brown",
    roomType: "Deluxe",
    roomNumber: "205",
    checkIn: "2023-05-18",
    checkOut: "2023-05-22",
    status: "Confirmed",
    paymentStatus: "Paid",
    totalAmount: "$850"
  },
  {
    id: "RES1002",
    guestName: "Sarah Johnson",
    roomType: "Suite",
    roomNumber: "310",
    checkIn: "2023-05-19",
    checkOut: "2023-05-24",
    status: "Pending",
    paymentStatus: "Unpaid",
    totalAmount: "$1200"
  },
  {
    id: "RES1003",
    guestName: "Robert Williams",
    roomType: "Standard",
    roomNumber: "112",
    checkIn: "2023-05-20",
    checkOut: "2023-05-21",
    status: "Confirmed",
    paymentStatus: "Paid",
    totalAmount: "$150"
  },
  {
    id: "RES1004",
    guestName: "Jennifer Davis",
    roomType: "Presidential Suite",
    roomNumber: "501",
    checkIn: "2023-05-22",
    checkOut: "2023-05-29",
    status: "Confirmed",
    paymentStatus: "Partially Paid",
    totalAmount: "$4200"
  }
];

type PaymentStatus = 'Paid' | 'Unpaid' | 'Pending' | 'Partially Paid';
type ReservationStatus = 'Confirmed' | 'Pending';

const Reservations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReservations, setFilteredReservations] = useState(reservationsData);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = reservationsData.filter(
      reservation => 
        reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.roomNumber.includes(searchTerm)
    );
    setFilteredReservations(filtered);
  };

  const handleStatusChange = (id: string, newStatus: ReservationStatus) => {
    setFilteredReservations(prev => 
      prev.map(res => res.id === id ? {...res, status: newStatus} : res)
    );
    
    toast({
      title: "Reservation Status Updated",
      description: `Reservation ${id} status changed to ${newStatus}.`,
    });
  };

  const handleDeleteReservation = (id: string) => {
    setFilteredReservations(prev => prev.filter(res => res.id !== id));
    
    toast({
      title: "Reservation Deleted",
      description: `Reservation ${id} has been deleted.`,
      variant: "destructive",
    });
  };

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const guestName = formData.get('guestName') as string;
    const roomType = formData.get('roomType') as string;
    const checkIn = formData.get('checkIn') as string;
    const checkOut = formData.get('checkOut') as string;
    
    // In a real application, we would send this data to an API
    const newReservation = {
      id: `RES${Math.floor(1000 + Math.random() * 9000)}`,
      guestName,
      roomType,
      roomNumber: "",
      checkIn,
      checkOut,
      status: "Pending",
      paymentStatus: "Unpaid",
      totalAmount: "$0"
    };
    
    setFilteredReservations(prev => [newReservation, ...prev]);
    
    toast({
      title: "Reservation Created",
      description: `New reservation for ${guestName} has been successfully created.`,
    });
  };

  const handleEditReservation = (id: string) => {
    toast({
      title: "Edit Reservation",
      description: `Opening editor for reservation ${id}.`,
    });
  };

  const handlePaymentStatusChange = (reservationId: string, newStatus: PaymentStatus) => {
    setFilteredReservations(prev => 
      prev.map(res => res.id === reservationId ? {...res, paymentStatus: newStatus} : res)
    );
    
    toast({
      title: "Payment Status Updated",
      description: `Payment status for reservation ${reservationId} changed to ${newStatus}.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
            <p className="text-muted-foreground">
              Manage hotel reservations and bookings
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-hotel-primary hover:bg-hotel-dark">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Reservation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Reservation</DialogTitle>
                <DialogDescription>
                  Enter the details for the new reservation.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateReservation} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="guestName" className="text-sm font-medium">Guest Name</label>
                    <Input id="guestName" name="guestName" placeholder="Enter guest name" required />
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
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Suite">Suite</option>
                      <option value="Presidential Suite">Presidential Suite</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="checkIn" className="text-sm font-medium">Check-in Date</label>
                    <Input id="checkIn" name="checkIn" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="checkOut" className="text-sm font-medium">Check-out Date</label>
                    <Input id="checkOut" name="checkOut" type="date" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Reservation</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Reservations</CardTitle>
            <CardDescription>
              View and manage all upcoming guest reservations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
              <Input
                placeholder="Search reservations..."
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
                    <TableHead>ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Check In/Out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>{reservation.id}</TableCell>
                      <TableCell>{reservation.guestName}</TableCell>
                      <TableCell>
                        {`${reservation.roomType} ${reservation.roomNumber ? `(${reservation.roomNumber})` : ''}`}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs">In: {reservation.checkIn}</span>
                          <span className="text-xs">Out: {reservation.checkOut}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusSelector 
                          currentStatus={reservation.status as ReservationStatus}
                          reservationId={reservation.id}
                          onStatusChange={handleStatusChange}
                        />
                      </TableCell>
                      <TableCell>
                        <PaymentStatusSelector 
                          currentStatus={reservation.paymentStatus as PaymentStatus}
                          reservationId={reservation.id}
                          onStatusChange={handlePaymentStatusChange}
                        />
                      </TableCell>
                      <TableCell>{reservation.totalAmount}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditReservation(reservation.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-500"
                            onClick={() => handleDeleteReservation(reservation.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredReservations.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No reservations found.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reservations;
