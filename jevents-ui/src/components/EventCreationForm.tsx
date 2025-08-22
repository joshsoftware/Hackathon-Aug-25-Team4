import { Calendar, MapPin, DollarSign, Users, Image, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function EventCreationForm() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
          <p className="text-muted-foreground">
            Fill out the details below to create your event and start selling tickets
          </p>
        </div>

        <form className="space-y-8">
          {/* Basic Information */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">
                  Event Title *
                </Label>
                <Input 
                  id="title"
                  placeholder="Enter your event title"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Event Description *
                </Label>
                <Textarea 
                  id="description"
                  placeholder="Describe what makes your event special..."
                  className="mt-2 min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium">
                    Category *
                  </Label>
                  <Input 
                    id="category"
                    placeholder="e.g., Technology, Music, Business"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="tags" className="text-sm font-medium">
                    Tags
                  </Label>
                  <Input 
                    id="tags"
                    placeholder="Add relevant tags (separated by commas)"
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date & Location */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Date & Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="start-date" className="text-sm font-medium">
                    Start Date & Time *
                  </Label>
                  <Input 
                    id="start-date"
                    type="datetime-local"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="end-date" className="text-sm font-medium">
                    End Date & Time *
                  </Label>
                  <Input 
                    id="end-date"
                    type="datetime-local"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="venue" className="text-sm font-medium">
                  Venue Name *
                </Label>
                <Input 
                  id="venue"
                  placeholder="Enter venue name"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-medium">
                  Address *
                </Label>
                <Input 
                  id="address"
                  placeholder="Enter full address"
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Ticket Information */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="h-5 w-5 mr-2 text-primary" />
                Ticket Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* General Admission */}
              <div className="border rounded-lg p-6 space-y-4">
                <h4 className="font-medium text-lg">General Admission</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="general-price" className="text-sm font-medium">
                      Price ($)
                    </Label>
                    <Input 
                      id="general-price"
                      type="number"
                      placeholder="0.00"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="general-quantity" className="text-sm font-medium">
                      Quantity Available
                    </Label>
                    <Input 
                      id="general-quantity"
                      type="number"
                      placeholder="100"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="general-sales-start" className="text-sm font-medium">
                      Sales Start Date
                    </Label>
                    <Input 
                      id="general-sales-start"
                      type="datetime-local"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* VIP Tickets */}
              <div className="border rounded-lg p-6 space-y-4">
                <h4 className="font-medium text-lg">VIP Experience</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="vip-price" className="text-sm font-medium">
                      Price ($)
                    </Label>
                    <Input 
                      id="vip-price"
                      type="number"
                      placeholder="0.00"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vip-quantity" className="text-sm font-medium">
                      Quantity Available
                    </Label>
                    <Input 
                      id="vip-quantity"
                      type="number"
                      placeholder="50"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vip-sales-start" className="text-sm font-medium">
                      Sales Start Date
                    </Label>
                    <Input 
                      id="vip-sales-start"
                      type="datetime-local"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                + Add Another Ticket Category
              </Button>
            </CardContent>
          </Card>

          {/* Event Image */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="h-5 w-5 mr-2 text-primary" />
                Event Banner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Upload a high-quality banner image for your event
                </p>
                <Button variant="outline">
                  Choose Image
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Recommended: 1200x600px, JPG or PNG, max 5MB
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6">
            <Button variant="outline" size="lg">
              Save as Draft
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" size="lg">
                Preview Event
              </Button>
              <Button className="btn-hero" size="lg">
                Publish Event
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}