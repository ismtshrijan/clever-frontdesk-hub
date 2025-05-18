
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your hotel system preferences and configurations.
          </p>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure general system settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="hotelName">Hotel Name</Label>
                  <Input id="hotelName" defaultValue="Grand Hotel" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input id="contactEmail" defaultValue="reception@grandhotel.com" type="email" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input id="phoneNumber" defaultValue="+1 (555) 123-4567" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Luxury Lane, Prestige City, 90210" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="America/New_York"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="24hourMode" className="cursor-pointer">Use 24-hour time format</Label>
                  <Switch id="24hourMode" />
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how you receive notifications and alerts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications" className="cursor-pointer">Email Notifications</Label>
                  <Switch id="emailNotifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="smsNotifications" className="cursor-pointer">SMS Notifications</Label>
                  <Switch id="smsNotifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="desktopNotifications" className="cursor-pointer">Desktop Notifications</Label>
                  <Switch id="desktopNotifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="checkInAlerts" className="cursor-pointer">Check-in Alerts</Label>
                  <Switch id="checkInAlerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenanceAlerts" className="cursor-pointer">Maintenance Alerts</Label>
                  <Switch id="maintenanceAlerts" defaultChecked />
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and authentication preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="twoFactor" className="cursor-pointer">Enable Two-Factor Authentication</Label>
                  <Switch id="twoFactor" />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="sessionTimeout" className="cursor-pointer">Auto-logout after inactivity (30 minutes)</Label>
                  <Switch id="sessionTimeout" defaultChecked />
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSave}>Update Security Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>
                  Connect to third-party services and APIs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Payment Gateway</h3>
                    <p className="text-sm text-muted-foreground">Connect to your payment processor</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                
                <div className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Email Service</h3>
                    <p className="text-sm text-muted-foreground">Connect to your email provider</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                
                <div className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Property Management System</h3>
                    <p className="text-sm text-muted-foreground">Connect to your PMS</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                
                <div className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Channel Manager</h3>
                    <p className="text-sm text-muted-foreground">Connect to online booking channels</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
