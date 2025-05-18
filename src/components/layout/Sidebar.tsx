
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard,
  Users,
  CheckSquare,
  Calendar,
  DoorClosed,
  Award,
  ClipboardList,
  Settings,
  HelpCircle
} from "lucide-react";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => cn(
      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
      isActive 
        ? "bg-hotel-dark text-white" 
        : "text-gray-200 hover:bg-hotel-dark/50"
    )}
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

const Sidebar = () => {
  return (
    <div className="w-64 bg-hotel-primary h-screen flex flex-col">
      <div className="p-4 border-b border-hotel-dark/50">
        <h2 className="text-xl font-semibold text-white">Front Desk</h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavItem to="/check-in" icon={<CheckSquare size={20} />} label="Check In" />
        <NavItem to="/guests" icon={<Users size={20} />} label="Guests" />
        <NavItem to="/rooms" icon={<DoorClosed size={20} />} label="Rooms" />
        <NavItem to="/reservations" icon={<Calendar size={20} />} label="Reservations" />
        <NavItem to="/loyalty" icon={<Award size={20} />} label="Loyalty Program" />
        <NavItem to="/tasks" icon={<ClipboardList size={20} />} label="Tasks" />
      </nav>
      
      <div className="border-t border-hotel-dark/50 p-4 space-y-1">
        <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
        <NavItem to="/help" icon={<HelpCircle size={20} />} label="Help & Support" />
      </div>
    </div>
  );
};

export default Sidebar;
