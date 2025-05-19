
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, UserPlus } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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

const CheckInQueue: React.FC<CheckInQueueProps> = ({ queue: initialQueue, onCheckIn }) => {
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGuest, setNewGuest] = useState({
    guestName: '',
    roomNumber: '',
  });

  // Handle check-in action
  const handleCheckIn = (id: string) => {
    // Remove the item from the queue
    setQueue(prev => prev.filter(item => item.id !== id));
    // Call the parent component's onCheckIn function
    onCheckIn(id);
  };

  // Handle adding a new guest to the queue
  const handleAddToQueue = () => {
    if (newGuest.guestName.trim() === '' || newGuest.roomNumber.trim() === '') {
      return;
    }

    const newQueueItem: QueueItem = {
      id: `guest-${Date.now()}`,
      guestName: newGuest.guestName,
      roomNumber: newGuest.roomNumber,
      arrivalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'waiting',
    };

    setQueue(prev => [newQueueItem, ...prev]);
    setNewGuest({ guestName: '', roomNumber: '' });
    setIsDialogOpen(false);
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Check-In Queue</CardTitle>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={() => setIsDialogOpen(true)}
        >
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
                  onClick={() => handleCheckIn(item.id)}
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

      {/* Add to Queue Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Guest to Check-In Queue</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="guestName" className="text-sm font-medium">Guest Name</label>
              <Input 
                id="guestName" 
                value={newGuest.guestName}
                onChange={(e) => setNewGuest(prev => ({ ...prev, guestName: e.target.value }))}
                placeholder="Enter guest name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="roomNumber" className="text-sm font-medium">Room Number</label>
              <Input 
                id="roomNumber" 
                value={newGuest.roomNumber}
                onChange={(e) => setNewGuest(prev => ({ ...prev, roomNumber: e.target.value }))}
                placeholder="Enter room number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddToQueue}>
              Add to Queue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CheckInQueue;
