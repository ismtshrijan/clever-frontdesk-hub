
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Reservations = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
          <p className="text-muted-foreground">
            Manage hotel reservations and bookings
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Reservations</CardTitle>
            <CardDescription>
              View and manage all upcoming guest reservations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Reservation content will be displayed here</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reservations;
