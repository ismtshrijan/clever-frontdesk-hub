
import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ReservationStatus = 'Confirmed' | 'Pending';

interface StatusSelectorProps {
  currentStatus: ReservationStatus;
  reservationId: string;
  onStatusChange: (reservationId: string, status: ReservationStatus) => void;
}

const getStatusColor = (status: ReservationStatus) => {
  switch (status) {
    case 'Confirmed':
      return "bg-green-100 text-green-800";
    case 'Pending':
      return "bg-yellow-100 text-yellow-800";
    default:
      return "";
  }
};

const getStatusIcon = (status: ReservationStatus) => {
  switch (status) {
    case 'Confirmed':
      return <CheckCircle className="h-4 w-4 mr-1" />;
    case 'Pending':
      return <Clock className="h-4 w-4 mr-1" />;
    default:
      return null;
  }
};

export const StatusSelector: React.FC<StatusSelectorProps> = ({ 
  currentStatus, 
  reservationId,
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
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => onStatusChange(reservationId, 'Confirmed')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <CheckCircle className="h-4 w-4" />
          <span>Confirmed</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onStatusChange(reservationId, 'Pending')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Clock className="h-4 w-4" />
          <span>Pending</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusSelector;
