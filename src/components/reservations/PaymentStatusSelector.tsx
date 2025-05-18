
import React from 'react';
import { CheckCircle, Clock, CircleDollarSign, CreditCard } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type PaymentStatus = 'Paid' | 'Unpaid' | 'Pending' | 'Partially Paid';

interface PaymentStatusSelectorProps {
  currentStatus: PaymentStatus;
  reservationId: string;
  onStatusChange: (reservationId: string, status: PaymentStatus) => void;
}

const getStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case 'Paid':
      return "bg-green-100 text-green-800";
    case 'Unpaid':
      return "bg-red-100 text-red-800";
    case 'Pending':
      return "bg-yellow-100 text-yellow-800";
    case 'Partially Paid':
      return "bg-blue-100 text-blue-800";
    default:
      return "";
  }
};

const getStatusIcon = (status: PaymentStatus) => {
  switch (status) {
    case 'Paid':
      return <CheckCircle className="h-4 w-4 mr-1" />;
    case 'Unpaid':
      return <CircleDollarSign className="h-4 w-4 mr-1" />;
    case 'Pending':
      return <Clock className="h-4 w-4 mr-1" />;
    case 'Partially Paid':
      return <CreditCard className="h-4 w-4 mr-1" />;
    default:
      return null;
  }
};

export const PaymentStatusSelector: React.FC<PaymentStatusSelectorProps> = ({ 
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
          onClick={() => onStatusChange(reservationId, 'Paid')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <CheckCircle className="h-4 w-4" />
          <span>Paid</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onStatusChange(reservationId, 'Unpaid')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <CircleDollarSign className="h-4 w-4" />
          <span>Unpaid</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onStatusChange(reservationId, 'Pending')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Clock className="h-4 w-4" />
          <span>Pending</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onStatusChange(reservationId, 'Partially Paid')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <CreditCard className="h-4 w-4" />
          <span>Partially Paid</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PaymentStatusSelector;
