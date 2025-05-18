
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  className 
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {change && (
              <p className={cn(
                "text-xs font-medium mt-1",
                change.isPositive ? "text-green-500" : "text-hotel-secondary"
              )}>
                {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
              </p>
            )}
          </div>
          
          <div className="h-12 w-12 rounded-lg bg-hotel-primary/10 flex items-center justify-center text-hotel-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
