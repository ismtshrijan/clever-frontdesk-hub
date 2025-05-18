
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RoomTypeStatus {
  type: string;
  total: number;
  available: number;
  occupied: number;
  outOfOrder: number;
}

interface RoomsOverviewProps {
  roomTypes: RoomTypeStatus[];
}

const RoomsOverview: React.FC<RoomsOverviewProps> = ({ roomTypes }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {roomTypes.map((roomType, index) => {
            const availablePercent = (roomType.available / roomType.total) * 100;
            const occupiedPercent = (roomType.occupied / roomType.total) * 100;
            const outOfOrderPercent = (roomType.outOfOrder / roomType.total) * 100;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{roomType.type}</h4>
                  <span className="text-sm text-muted-foreground">
                    {roomType.available} of {roomType.total} available
                  </span>
                </div>
                
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="flex h-full">
                    <div 
                      className="bg-green-500" 
                      style={{ width: `${availablePercent}%` }}
                    />
                    <div 
                      className="bg-hotel-primary" 
                      style={{ width: `${occupiedPercent}%` }}
                    />
                    <div 
                      className="bg-gray-400" 
                      style={{ width: `${outOfOrderPercent}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex text-xs gap-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
                    <span>Available ({roomType.available})</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-hotel-primary mr-1" />
                    <span>Occupied ({roomType.occupied})</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 mr-1" />
                    <span>Out of order ({roomType.outOfOrder})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomsOverview;
