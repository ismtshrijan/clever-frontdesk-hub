
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  Search, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  User,
  ChevronDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';

// Sample tasks data
const tasksData = [
  { 
    id: "T1001", 
    title: "Restock minibar in room 304", 
    assignedTo: "John Doe",
    priority: "Medium",
    status: "Pending",
    dueDate: "2023-05-18 15:00" 
  },
  { 
    id: "T1002", 
    title: "Replace towels in room 215", 
    assignedTo: "Sarah Johnson",
    priority: "High",
    status: "Completed",
    dueDate: "2023-05-17 12:00" 
  },
  { 
    id: "T1003", 
    title: "Fix AC in room 512", 
    assignedTo: "Mike Roberts",
    priority: "Urgent",
    status: "In Progress",
    dueDate: "2023-05-18 10:00" 
  },
  { 
    id: "T1004", 
    title: "Clean lobby area", 
    assignedTo: "Lisa Wong",
    priority: "Medium",
    status: "Pending",
    dueDate: "2023-05-18 18:00" 
  },
  { 
    id: "T1005", 
    title: "Deliver extra blankets to room 403", 
    assignedTo: "John Doe",
    priority: "Low",
    status: "Pending",
    dueDate: "2023-05-18 20:00" 
  }
];

// Task summary
const taskSummary = {
  total: tasksData.length,
  pending: tasksData.filter(task => task.status === 'Pending').length,
  inProgress: tasksData.filter(task => task.status === 'In Progress').length,
  completed: tasksData.filter(task => task.status === 'Completed').length,
  urgent: tasksData.filter(task => task.priority === 'Urgent').length
};

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasksData);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // This would use a proper database query in production
    const filtered = tasksData.filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    // This would update the database in production
    toast({
      title: "Task Status Updated",
      description: `Task ${taskId} status changed to ${newStatus}.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">
              Manage hotel tasks and assignments.
            </p>
          </div>
          <Button className="bg-hotel-primary hover:bg-hotel-dark">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Task
          </Button>
        </div>
        
        {/* Task Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                  <h3 className="text-2xl font-bold mt-1">{taskSummary.total}</h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-hotel-primary/10 flex items-center justify-center text-hotel-primary">
                  <ClipboardList className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <h3 className="text-2xl font-bold mt-1">{taskSummary.pending}</h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <h3 className="text-2xl font-bold mt-1">{taskSummary.inProgress}</h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <User className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <h3 className="text-2xl font-bold mt-1">{taskSummary.completed}</h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Urgent</p>
                  <h3 className="text-2xl font-bold mt-1">{taskSummary.urgent}</h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                  <AlertCircle className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task List */}
        <Card>
          <CardHeader>
            <CardTitle>Task List</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
              <Input
                placeholder="Search tasks..."
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
                    <TableHead>Task</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.id}</TableCell>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.assignedTo}</TableCell>
                      <TableCell>
                        <Badge className={
                          task.priority === 'Low' ? "bg-blue-100 text-blue-800" :
                          task.priority === 'Medium' ? "bg-yellow-100 text-yellow-800" :
                          task.priority === 'High' ? "bg-orange-100 text-orange-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          task.status === 'Pending' ? "bg-yellow-100 text-yellow-800" :
                          task.status === 'In Progress' ? "bg-blue-100 text-blue-800" :
                          "bg-green-100 text-green-800"
                        }>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className={task.status === "Completed" ? "bg-gray-100" : ""}
                            disabled={task.status === "Completed"}
                            onClick={() => handleStatusChange(task.id, "Completed")}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredTasks.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No tasks found.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Tasks;
