
import React from 'react';
import { CheckCircle2, Clock, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

interface TaskStatusSelectorProps {
  currentStatus: TaskStatus;
  taskId: string;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case 'Completed':
      return "bg-green-100 text-green-800";
    case 'In Progress':
      return "bg-blue-100 text-blue-800";
    case 'Pending':
      return "bg-yellow-100 text-yellow-800";
    default:
      return "";
  }
};

const getStatusIcon = (status: TaskStatus) => {
  switch (status) {
    case 'Completed':
      return <CheckCircle2 className="h-4 w-4 mr-1" />;
    case 'In Progress':
      return <User className="h-4 w-4 mr-1" />;
    case 'Pending':
      return <Clock className="h-4 w-4 mr-1" />;
    default:
      return null;
  }
};

export const TaskStatusSelector: React.FC<TaskStatusSelectorProps> = ({ 
  currentStatus, 
  taskId,
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
          onClick={() => onStatusChange(taskId, 'Completed')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>Completed</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onStatusChange(taskId, 'In Progress')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <User className="h-4 w-4" />
          <span>In Progress</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onStatusChange(taskId, 'Pending')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Clock className="h-4 w-4" />
          <span>Pending</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskStatusSelector;
