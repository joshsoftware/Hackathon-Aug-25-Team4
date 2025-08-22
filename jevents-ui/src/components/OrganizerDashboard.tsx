import {
  BarChart3,
  Calendar,
  DollarSign,
  Plus,
  Users,
  TrendingUp,
  Bell,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrganizerDashboard() {
  const stats = [
    {
      title: "Total Events",
      value: "12",
      change: "+3 this month",
      icon: Calendar,
      color: "text-primary",
    },
    {
      title: "Total Revenue",
      value: "$24,580",
      change: "+12% this month",
      icon: DollarSign,
      color: "text-accent",
    },
    {
      title: "Attendees",
      value: "1,847",
      change: "+23% this month",
      icon: Users,
      color: "text-info",
    },
    {
      title: "Avg Rating",
      value: "4.8",
      change: "+0.2 this month",
      icon: TrendingUp,
      color: "text-warning",
    },
  ];

  const recentEvents = [
    {
      name: "Tech Conference 2024",
      date: "March 15, 2024",
      attendees: 245,
      revenue: "$12,250",
      status: "Active",
    },
    {
      name: "Summer Music Festival",
      date: "March 20, 2024",
      attendees: 156,
      revenue: "$7,800",
      status: "Selling",
    },
    {
      name: "Art Exhibition Opening",
      date: "March 25, 2024",
      attendees: 89,
      revenue: "$4,450",
      status: "Draft",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="bg-gradient-hero py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, Sarah! 👋
              </h1>
              <p className="text-primary-foreground/80">
                Here's what's happening with your events today
              </p>
            </div>
            <Button className="bg-white text-primary hover:bg-white/90 font-medium">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-sm text-accent mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 bg-primary/10 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Events and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Events */}
          <div className="lg:col-span-2">
            <Card className="card-elevated">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  Recent Events
                </CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">
                          {event.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {event.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{event.revenue}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.attendees} attendees
                        </p>
                      </div>
                      <span
                        className={`ml-4 px-2 py-1 text-xs font-medium rounded-full ${
                          event.status === "Active"
                            ? "bg-accent/10 text-accent"
                            : event.status === "Selling"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start btn-hero">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Event
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Manage Notifications
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Events Created
                    </span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tickets Sold</span>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-medium text-accent">$3,420</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
