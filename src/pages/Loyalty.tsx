
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, Award, Gift, Trophy, Star, Edit } from "lucide-react";
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

// Sample loyalty members data
const loyaltyMembersData = [
  {
    id: "L1001",
    name: "Jennifer Lawrence",
    email: "jennifer@example.com",
    phone: "555-123-4567",
    tier: "Diamond",
    points: 15400,
    joined: "2021-03-15",
    lastStay: "2023-05-10"
  },
  {
    id: "L1002",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "555-987-6543",
    tier: "Gold",
    points: 7800,
    joined: "2022-01-20",
    lastStay: "2023-04-28"
  },
  {
    id: "L1003",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "555-789-1234",
    tier: "Silver",
    points: 3200,
    joined: "2022-09-05",
    lastStay: "2023-05-05"
  },
  {
    id: "L1004",
    name: "Robert Williams",
    email: "robert@example.com",
    phone: "555-456-7890",
    tier: "Bronze",
    points: 850,
    joined: "2023-02-10",
    lastStay: "2023-04-15"
  }
];

const tierBenefits = {
  "Diamond": ["Free room upgrades", "Late checkout", "Welcome gift", "24/7 concierge", "50% bonus points"],
  "Gold": ["Room upgrades (subject to availability)", "Late checkout", "Welcome drink", "25% bonus points"],
  "Silver": ["Early check-in (subject to availability)", "Welcome drink", "10% bonus points"],
  "Bronze": ["5% bonus points"]
};

const Loyalty = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(loyaltyMembersData);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = loyaltyMembersData.filter(
      member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phone.includes(searchTerm)
    );
    setFilteredMembers(filtered);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Member Added",
      description: "New loyalty member has been successfully added.",
    });
  };

  const handleAwardPoints = (memberId: string, points: number) => {
    toast({
      title: "Points Awarded",
      description: `${points} points have been awarded to member ${memberId}.`,
    });
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Diamond':
        return 'bg-purple-100 text-purple-800';
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Silver':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-amber-100 text-amber-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Loyalty Program</h1>
            <p className="text-muted-foreground">
              Manage the hotel loyalty program and member benefits
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-hotel-primary hover:bg-hotel-dark">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Loyalty Member</DialogTitle>
                <DialogDescription>
                  Enter details to add a new member to the loyalty program.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddMember} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <Input id="name" placeholder="Enter full name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Enter email address" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                    <Input id="phone" placeholder="Enter phone number" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="tier" className="text-sm font-medium">Initial Tier</label>
                    <Input id="tier" placeholder="Bronze" defaultValue="Bronze" readOnly />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Member</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tier Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Diamond Members</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {loyaltyMembersData.filter(member => member.tier === 'Diamond').length}
                  </h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                  <Trophy className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Gold Members</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {loyaltyMembersData.filter(member => member.tier === 'Gold').length}
                  </h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <Star className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Silver Members</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {loyaltyMembersData.filter(member => member.tier === 'Silver').length}
                  </h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                  <Award className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {loyaltyMembersData.length}
                  </h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                  <Gift className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tier Benefits Card */}
        <Card>
          <CardHeader>
            <CardTitle>Loyalty Tier Benefits</CardTitle>
            <CardDescription>
              Benefits available to different membership tiers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {Object.entries(tierBenefits).map(([tier, benefits]) => (
                <Card key={tier} className="overflow-hidden">
                  <CardHeader className={
                    tier === 'Diamond' ? 'bg-purple-100' :
                    tier === 'Gold' ? 'bg-yellow-100' :
                    tier === 'Silver' ? 'bg-slate-100' :
                    'bg-amber-100'
                  }>
                    <CardTitle className="text-center">{tier}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="list-disc pl-5 space-y-1">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="text-sm">{benefit}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Loyalty Members List */}
        <Card>
          <CardHeader>
            <CardTitle>Loyalty Members</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
              <Input
                placeholder="Search members by name, email, ID..."
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
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Stay</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.id}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{member.email}</div>
                          <div className="text-xs text-muted-foreground">{member.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTierColor(member.tier)}>
                          {member.tier}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.points.toLocaleString()}</TableCell>
                      <TableCell>{member.joined}</TableCell>
                      <TableCell>{member.lastStay}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                Award Points
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Award Points</DialogTitle>
                                <DialogDescription>
                                  Award loyalty points to {member.name}
                                </DialogDescription>
                              </DialogHeader>
                              <form className="space-y-4 mt-4" onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement;
                                const points = parseInt((form.elements.namedItem('points') as HTMLInputElement).value);
                                handleAwardPoints(member.id, points);
                              }}>
                                <div className="space-y-2">
                                  <label htmlFor="points" className="text-sm font-medium">Points</label>
                                  <Input id="points" name="points" type="number" defaultValue="100" min="1" required />
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Award Points</Button>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredMembers.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No members found matching your criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Loyalty;
