
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
import { Search, Filter, UserPlus, Award, Plus } from "lucide-react";
import { guestsData } from '@/lib/mock-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GuestFormValues {
  name: string;
  email: string;
  phone: string;
  loyaltyTier: string;
}

const Guests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGuests, setFilteredGuests] = useState(guestsData);
  const [isAddGuestDialogOpen, setIsAddGuestDialogOpen] = useState(false);
  const [isCreateTaskDialogOpen, setIsCreateTaskDialogOpen] = useState(false);
  
  const form = useForm<GuestFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      loyaltyTier: 'Gold',
    },
  });

  const taskForm = useForm({
    defaultValues: {
      title: '',
      description: '',
      assignee: '',
      priority: 'Medium',
      guestId: '',
    },
  });

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

  const handleAddGuest = (data: GuestFormValues) => {
    // In a real app, this would be an API call to create a guest
    const newGuest = {
      id: `guest-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      status: 'Pending' as const,
      roomNumber: '-',
      checkIn: '-',
      checkOut: '-',
      loyaltyTier: data.loyaltyTier as 'Gold' | 'Diamond',
    };
    
    setFilteredGuests([newGuest, ...filteredGuests]);
    setIsAddGuestDialogOpen(false);
    form.reset();
    
    toast({
      title: "Guest Added",
      description: `${data.name} has been added to the system.`,
    });
  };

  const handleCreateTask = (data: any) => {
    // In a real app, this would be an API call to create a task
    setIsCreateTaskDialogOpen(false);
    taskForm.reset();
    
    toast({
      title: "Task Created",
      description: `Task "${data.title}" has been created.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Guests</h1>
            <p className="text-muted-foreground">Manage guest information and profiles.</p>
          </div>
          <div className="flex gap-2">
            <Button 
              className="bg-hotel-primary hover:bg-hotel-dark"
              onClick={() => setIsAddGuestDialogOpen(true)}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Guest
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsCreateTaskDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          </div>
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

      {/* Add Guest Dialog */}
      <Dialog open={isAddGuestDialogOpen} onOpenChange={setIsAddGuestDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Guest</DialogTitle>
            <DialogDescription>
              Enter the guest information below to add them to the system.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddGuest)} className="space-y-4 py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 555-123-4567" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="loyaltyTier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loyalty Tier</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select loyalty tier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Gold">Gold</SelectItem>
                        <SelectItem value="Diamond">Diamond</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddGuestDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Guest</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Create Task Dialog */}
      <Dialog open={isCreateTaskDialogOpen} onOpenChange={setIsCreateTaskDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription>
              Create a new task related to a guest.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={taskForm.handleSubmit(handleCreateTask)} className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Task Title</label>
              <Input 
                {...taskForm.register('title')} 
                placeholder="Room cleaning" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input 
                {...taskForm.register('description')} 
                placeholder="Clean room 101 before 2pm" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Assign To</label>
              <Select 
                onValueChange={(value) => taskForm.setValue('assignee', value)} 
                defaultValue=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="michael">Michael Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select 
                onValueChange={(value) => taskForm.setValue('priority', value)} 
                defaultValue="Medium"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Related Guest</label>
              <Select 
                onValueChange={(value) => taskForm.setValue('guestId', value)} 
                defaultValue=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select guest (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {filteredGuests.map(guest => (
                    <SelectItem key={guest.id} value={guest.id}>{guest.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateTaskDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Task</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Guests;
