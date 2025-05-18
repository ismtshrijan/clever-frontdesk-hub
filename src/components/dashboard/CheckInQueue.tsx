
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, UserPlus } from 'lucide-react';
import { cn } from "@/lib/utils";

interface QueueItem {
  id: string;
  guestName: string;
  roomNumber: string;
  arrivalTime: string;
  status: 'waiting' | 'processing' | 'priority';
}

interface CheckInQueueProps {
  queue: QueueItem[];
  onCheckIn: (id: string) => void;
}

const CheckInQueue: React.FC<CheckInQueueProps> = ({ queue, onCheckIn }) => {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Check-In Queue</CardTitle>
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <UserPlus className="h-4 w-4" />
          Add to Queue
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {queue.length > 0 ? (
            queue.map((item) => (
              <div 
                key={item.id}
                className={cn(
                  "flex justify-between items-center p-3 rounded-lg border",
                  item.status === 'waiting' ? "bg-white" : 
                  item.status === 'priority' ? "bg-amber-50 border-amber-200" : 
                  "bg-blue-50 border-blue-200"
                )}
              >
                <div>
                  <p className="font-medium">{item.guestName}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Room {item.roomNumber}</span>
                    <span>•</span>
                    <span>{item.arrivalTime}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => onCheckIn(item.id)}
                  className="bg-hotel-primary hover:bg-hotel-dark"
                >
                  <CheckSquare className="h-4 w-4 mr-1" />
                  Check In
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No guests in the check-in queue
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckInQueue;
