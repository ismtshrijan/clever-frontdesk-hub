
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Award, Search, Star, Gift, BadgePercent } from "lucide-react";
import { guestsData } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

// Sample loyalty tiers
const loyaltyTiers = [
  {
    name: "Bronze",
    requiredPoints: 0,
    benefits: ["Free Wi-Fi", "Late checkout (when available)"],
    icon: Star
  },
  {
    name: "Silver",
    requiredPoints: 5000,
    benefits: ["10% discount on dining", "Room upgrades (when available)", "Early check-in"],
    icon: Award
  },
  {
    name: "Gold",
    requiredPoints: 10000,
    benefits: ["15% discount on all services", "Guaranteed room upgrades", "Welcome gift"],
    icon: Gift
  },
  {
    name: "Diamond",
    requiredPoints: 25000,
    benefits: ["25% discount on all services", "Guaranteed suite upgrades", "Free breakfast", "Airport transfers"],
    icon: BadgePercent
  }
];

// Sample rewards
const loyaltyRewards = [
  { id: "R1", name: "Free Night Stay", pointsCost: 15000, available: true },
  { id: "R2", name: "Spa Treatment", pointsCost: 5000, available: true },
  { id: "R3", name: "Airport Transfer", pointsCost: 2500, available: true },
  { id: "R4", name: "Dining Credit", pointsCost: 3000, available: true },
  { id: "R5", name: "Room Upgrade", pointsCost: 4000, available: true },
];

const Loyalty = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGuests, setFilteredGuests] = useState(guestsData);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // This would use a proper database query in production
    const filtered = guestsData.filter(guest => 
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGuests(filtered);
  };

  const handleRedeemReward = (guestId: string, rewardId: string, pointsCost: number) => {
    // This would call sp_RedeemLoyaltyReward in production
    toast({
      title: "Reward Redeemed",
      description: `Reward ID: ${rewardId} has been successfully redeemed for guest ${guestId}.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loyalty Program</h1>
          <p className="text-muted-foreground">
            Manage guest loyalty tiers, points, and rewards.
          </p>
        </div>
        
        {/* Loyalty Tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loyaltyTiers.map((tier, index) => {
            const TierIcon = tier.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className={`h-12 w-12 rounded-full ${
                      tier.name === 'Bronze' ? 'bg-amber-700/20 text-amber-700' :
                      tier.name === 'Silver' ? 'bg-gray-300/20 text-gray-500' :
                      tier.name === 'Gold' ? 'bg-yellow-400/20 text-yellow-600' :
                      'bg-blue-400/20 text-blue-600'
                    } flex items-center justify-center mb-4`}>
                      <TierIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{tier.requiredPoints}+ points</p>
                    <ul className="mt-4 text-sm space-y-2">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center justify-center">
                          <span className="w-1 h-1 rounded-full bg-hotel-primary mr-2"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Guest Loyalty */}
        <Card>
          <CardHeader>
            <CardTitle>Guest Loyalty Status</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
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
            
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Points</TableHead>
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
                        <div className="flex items-center">
                          <Award className={`h-4 w-4 mr-1 ${
                            guest.loyaltyTier === 'Diamond' ? 'text-blue-500' : 
                            guest.loyaltyTier === 'Gold' ? 'text-yellow-500' :
                            guest.loyaltyTier === 'Silver' ? 'text-gray-400' : 
                            'text-amber-700'
                          }`} />
                          {guest.loyaltyTier}
                        </div>
                      </TableCell>
                      <TableCell>{guest.loyaltyPoints}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="bg-hotel-primary text-white hover:bg-hotel-dark">
                            View History
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => {
                              // This would open a modal in a real application
                              toast({
                                title: "Add Points",
                                description: `Adding points for ${guest.name}`,
                              });
                            }}
                          >
                            Add Points
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

        {/* Available Rewards */}
        <Card>
          <CardHeader>
            <CardTitle>Available Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loyaltyRewards.map((reward) => (
                <Card key={reward.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{reward.name}</h3>
                        <p className="text-sm text-muted-foreground">{reward.pointsCost} points</p>
                      </div>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-hotel-primary/10 text-hotel-primary">
                        <Gift className="h-4 w-4" />
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Select a guest",
                          description: "Please select a guest to redeem this reward.",
                        });
                      }}
                    >
                      Redeem
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Loyalty;
