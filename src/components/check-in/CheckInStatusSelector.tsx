
import React from 'react';
import { CheckCircle, Clock, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type CheckInStatus = 'Reserved' | 'Checked In' | 'Confirmed' | 'No Show';

interface CheckInStatusSelectorProps {
  currentStatus: CheckInStatus;
  guestId: string;
  onStatusChange: (guestId: string, status: CheckInStatus) => void;
}

const getStatusColor = (status: CheckInStatus) => {
  switch (status) {
    case 'Checked In':
      return "bg-blue-100 text-blue-800";
    case 'Reserved':
      return "bg-green-100 text-green-800";
    case 'Confirmed':
      return "bg-green-100 text-green-800";
    case 'No Show':
      return "bg-red-100 text-red-800";
    default:
      return "";
  }
};

const getStatusIcon = (status: CheckInStatus) => {
  switch (status) {
    case 'Checked In':
      return <User className="h-4 w-4 mr-1" />;
    case 'Reserved':
      return <Clock className="h-4 w-4 mr-1" />;
    case 'Confirmed':
      return <CheckCircle className="h-4 w-4 mr-1" />;
    case 'No Show':
      return <Clock className="h-4 w-4 mr-1" />;
    default:
      return null;
  }
};

export const CheckInStatusSelector: React.FC<CheckInStatusSelectorProps> = ({ 
  currentStatus, 
  guestId,
  onStatusChange 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-full justify-start p-2 hover:bg-transparent">
          <Badge className={`${getStatusColor(currentStatus)} flex items-center cursor-pointer`}>
            {getStatusIcon(currentStatus)}
            {currentStatus}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem 
          onClick={() => onStatusChange(guestId, 'Checked In')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <User className="h-4 w-4" />
          <span>Checked In</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onStatusChange(guestId, 'Reserved')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Clock className="h-4 w-4" />
          <span>Reserved</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onStatusChange(guestId, 'Confirmed')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <CheckCircle className="h-4 w-4" />
          <span>Confirmed</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onStatusChange(guestId, 'No Show')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Clock className="h-4 w-4" />
          <span>No Show</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CheckInStatusSelector;
