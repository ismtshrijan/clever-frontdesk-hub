
import { 
  DoorClosed, 
  Users, 
  Calendar, 
  BadgeDollarSign 
} from "lucide-react";

// Dashboard stats
export const dashboardStats = [
  {
    title: "Available Rooms",
    value: "42",
    icon: <DoorClosed className="h-6 w-6" />,
    change: { value: 8, isPositive: true },
  },
  {
    title: "Current Guests",
    value: "86",
    icon: <Users className="h-6 w-6" />,
    change: { value: 12, isPositive: true },
  },
  {
    title: "Today's Check-ins",
    value: "24",
    icon: <Calendar className="h-6 w-6" />,
    change: { value: 5, isPositive: false },
  },
  {
    title: "Revenue (Today)",
    value: "$8,245",
    icon: <BadgeDollarSign className="h-6 w-6" />,
    change: { value: 10, isPositive: true },
  },
];

// Room status data for pie chart
export const roomStatusData = [
  { name: "Occupied", value: 58, color: "#0f3460" },
  { name: "Available", value: 42, color: "#4caf50" },
  { name: "Cleaning", value: 15, color: "#ff9800" },
  { name: "Maintenance", value: 5, color: "#e94560" },
];

// Check-in queue data
export const checkInQueueData = [
  {
    id: "1",
    guestName: "John Smith",
    roomNumber: "204",
    arrivalTime: "3:30 PM",
    status: "priority" as const,
  },
  {
    id: "2",
    guestName: "Maria Garcia",
    roomNumber: "315",
    arrivalTime: "3:45 PM",
    status: "waiting" as const,
  },
  {
    id: "3",
    guestName: "Robert Johnson",
    roomNumber: "512",
    arrivalTime: "4:00 PM",
    status: "processing" as const,
  },
  {
    id: "4",
    guestName: "Sarah Williams",
    roomNumber: "103",
    arrivalTime: "4:15 PM",
    status: "waiting" as const,
  },
];

// Room types availability
export const roomTypesData = [
  {
    type: "Standard",
    total: 40,
    available: 12,
    occupied: 25,
    outOfOrder: 3,
  },
  {
    type: "Deluxe",
    total: 30,
    available: 8,
    occupied: 20,
    outOfOrder: 2,
  },
  {
    type: "Suite",
    total: 15,
    available: 5,
    occupied: 9,
    outOfOrder: 1,
  },
  {
    type: "Presidential Suite",
    total: 5,
    available: 2,
    occupied: 2,
    outOfOrder: 1,
  },
];

// Guest data for guest lookup
export const guestsData = [
  {
    id: "G1001",
    name: "Jennifer Lawrence",
    email: "jennifer@example.com",
    phone: "555-123-4567",
    status: "Checked In",
    roomNumber: "301",
    checkIn: "2023-05-15",
    checkOut: "2023-05-20",
    vip: true,
    loyaltyTier: "Diamond",
    loyaltyPoints: 15400
  },
  {
    id: "G1002",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "555-987-6543",
    status: "Reserved",
    roomNumber: "205",
    checkIn: "2023-05-18",
    checkOut: "2023-05-22",
    vip: false,
    loyaltyTier: "Gold",
    loyaltyPoints: 7800
  }
];
