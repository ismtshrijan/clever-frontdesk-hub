
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle, Search, Send, Book, MessageCircle, Bookmark } from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Initiated",
      description: `Searching for: ${searchQuery}`,
    });
  };

  const handleSupportRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support Request Sent",
      description: "Your support request has been submitted. Our team will get back to you shortly.",
    });
  };

  // FAQ data
  const faqs = [
    {
      question: "How do I process a check-in?",
      answer: "To process a check-in, navigate to the Check-In page from the sidebar. Search for the guest's reservation using their name, email, or reservation ID. Click the 'Check In' button next to their reservation details. Verify the guest's identity and payment method, then complete the process by clicking 'Confirm Check-In'."
    },
    {
      question: "How do I handle early check-ins?",
      answer: "For early check-ins, first check room availability in the Rooms page. If a suitable room is ready, proceed with normal check-in. If no rooms are available, offer to store the guest's luggage and take their mobile number to notify them when a room becomes available."
    },
    {
      question: "How do I process a refund?",
      answer: "To process a refund, go to the guest's reservation details and click on 'Process Refund'. Enter the refund amount and reason, then submit for approval. Refunds require manager approval for amounts over $100. The guest will receive the refund within 3-5 business days."
    },
    {
      question: "What should I do if the system is down?",
      answer: "If the system is down, switch to the emergency manual check-in/out procedures. Use the paper forms located at the front desk. Record all transactions in the manual log and enter them into the system once it's back online. Contact IT support immediately at ext. 555."
    },
    {
      question: "How do I assign a specific room to a guest?",
      answer: "To assign a specific room to a guest, go to their reservation details and click 'Assign Room'. You will see a list of available rooms matching the reserved room type. You can filter by floor, features, or preferences. Select the appropriate room and click 'Assign' to complete the process."
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground">
            Find answers and support for using the hotel management system
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What can we help you with today?</CardTitle>
            <CardDescription>
              Search our knowledge base or browse popular topics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Search help articles, guides, and FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        <Tabs defaultValue="faq">
          <TabsList>
            <TabsTrigger value="faq">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQs
            </TabsTrigger>
            <TabsTrigger value="guides">
              <Book className="h-4 w-4 mr-2" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="support">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Support
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Common questions and answers about using the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="guides" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Step-by-Step Guides</CardTitle>
                <CardDescription>
                  Detailed guides for common procedures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Guide Cards */}
                  {[
                    {
                      title: "Complete Check-in Guide",
                      description: "Step-by-step process for checking in guests",
                      icon: <Bookmark className="h-8 w-8 text-hotel-primary" />
                    },
                    {
                      title: "Handling Reservations",
                      description: "Managing bookings, changes and cancellations",
                      icon: <Bookmark className="h-8 w-8 text-hotel-primary" />
                    },
                    {
                      title: "Room Management",
                      description: "Assigning and managing room statuses",
                      icon: <Bookmark className="h-8 w-8 text-hotel-primary" />
                    },
                    {
                      title: "Loyalty Program Guide",
                      description: "Managing member tiers and benefits",
                      icon: <Bookmark className="h-8 w-8 text-hotel-primary" />
                    }
                  ].map((guide, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div>
                            {guide.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{guide.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {guide.description}
                            </p>
                            <Button variant="link" className="p-0 h-auto mt-2 text-hotel-primary">
                              Read Guide
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="support" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Submit a support request and our team will assist you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSupportRequest} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="Brief description of your issue" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">Category</label>
                    <select 
                      id="category" 
                      className="w-full border border-input bg-background px-3 py-2 rounded-md"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing Question</option>
                      <option value="account">Account Management</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                    <select 
                      id="priority" 
                      className="w-full border border-input bg-background px-3 py-2 rounded-md"
                      required
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <textarea 
                      id="description" 
                      rows={5}
                      className="w-full border border-input bg-background px-3 py-2 rounded-md resize-none"
                      placeholder="Please provide details about your issue..."
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full sm:w-auto">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Help;
