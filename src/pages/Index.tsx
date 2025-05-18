
import React from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import RoomStatusChart from '@/components/dashboard/RoomStatusChart';
import CheckInQueue from '@/components/dashboard/CheckInQueue';
import RoomsOverview from '@/components/dashboard/RoomsOverview';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  dashboardStats,
  roomStatusData,
  checkInQueueData,
  roomTypesData
} from '@/lib/mock-data';

const Dashboard = () => {
  const { toast } = useToast();
  
  const handleCheckIn = (id: string) => {
    // This would call the sp_SmartCheckIn procedure in the future
    toast({
      title: "Check-in initiated",
      description: `Guest ID: ${id} has been checked in.`,
    });
    // After API integration, this would refresh the queue data
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the reception dashboard. Here's today's overview.
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat, index) => (
            <StatCard 
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
            />
          ))}
        </div>
        
        {/* Charts & Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CheckInQueue queue={checkInQueueData} onCheckIn={handleCheckIn} />
          <RoomStatusChart data={roomStatusData} />
        </div>
        
        {/* Room Availability */}
        <div>
          <RoomsOverview roomTypes={roomTypesData} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
