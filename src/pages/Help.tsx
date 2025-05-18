
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, MessageSquare, Phone, Mail, BookOpen, CheckCircle } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

const Help = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support Request Sent",
      description: "We've received your support request and will respond shortly.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground">
            Get help with using the hotel management system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-hotel-primary/10 flex items-center justify-center text-hotel-primary mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium">Live Chat</h3>
              <p className="text-sm text-muted-foreground mt-2">Chat with our support team in real-time for immediate assistance.</p>
              <Button className="mt-4">Start Chat</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-hotel-primary/10 flex items-center justify-center text-hotel-primary mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium">Call Support</h3>
              <p className="text-sm text-muted-foreground mt-2">Call our dedicated support line for personalized assistance.</p>
              <Button className="mt-4">+1 (555) 987-6543</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-hotel-primary/10 flex items-center justify-center text-hotel-primary mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium">Documentation</h3>
              <p className="text-sm text-muted-foreground mt-2">Browse our comprehensive documentation and guides.</p>
              <Button className="mt-4">View Docs</Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Frequently Asked Questions */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Common questions and answers about the system.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <HelpCircle className="h-5 w-5 text-hotel-primary" />
                </div>
                <div>
                  <h4 className="font-medium">How do I process a check-in?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Navigate to the Check In page, search for the guest reservation, and click the "Check In" button. The system will guide you through the process.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <HelpCircle className="h-5 w-5 text-hotel-primary" />
                </div>
                <div>
                  <h4 className="font-medium">How do I assign a room to a guest?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    During the check-in process, you'll be prompted to select an available room. You can also change room assignments from the Guests page.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <HelpCircle className="h-5 w-5 text-hotel-primary" />
                </div>
                <div>
                  <h4 className="font-medium">How do I update a guest's loyalty points?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Go to the Loyalty Program page, find the guest in the list, and click "Add Points" to manually add loyalty points.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <HelpCircle className="h-5 w-5 text-hotel-primary" />
                </div>
                <div>
                  <h4 className="font-medium">How do I create a new task?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Navigate to the Tasks page and click the "Create Task" button. Fill in the required information and assign it to a staff member.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Submit a support request and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                  <Input id="name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                  <Input id="email" type="email" required />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">Subject</label>
                <Input id="subject" required />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
                <Textarea id="message" rows={5} required />
              </div>
              
              <Button type="submit" className="bg-hotel-primary hover:bg-hotel-dark">
                <Mail className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Help;
