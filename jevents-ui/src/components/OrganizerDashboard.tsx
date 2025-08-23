import { useEffect, useState } from "react";
import { Calendar, DollarSign, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { StatsResponse } from "@/types/order";
import { getStats } from "@/api/order";
import { useUserData } from "@/context/user";
import { useEvents } from "@/hooks/useEvents";

export default function OrganizerDashboard() {
  const { data } = useUserData();
  const userId = data?.user?.id;
  const { events } = useEvents(userId?.toString());

  const navigate = useNavigate();
  const [stats, setStats] = useState<StatsResponse>({
    user_id: 0,
    total_events: 0,
    total_revenue: "0.0",
    attendees: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!userId) return;
        const data: StatsResponse = await getStats(userId);
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };

    fetchStats();
  }, [userId]);

  const statsData = [
    {
      title: "Total Events",
      value: stats.total_events.toString(),
      icon: Calendar,
      color: "text-primary",
    },
    {
      title: "Total Revenue",
      value: `$${stats.total_revenue}`,
      icon: DollarSign,
      color: "text-accent",
    },
    {
      title: "Attendees",
      value: stats.attendees.toString(),
      icon: Users,
      color: "text-info",
    },
  ];

  // Map API events to the UI format
  const recentEvents = events?.map((event) => ({
    name: event.title,
    date: new Date(event.start_time).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    attendees: event.attendees || 0, // if API provides
    revenue: `$${event.revenue || "0.0"}`, // if API provides
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="bg-gradient-hero py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {data?.user?.name || "User"}! 👋
              </h1>
              <p className="text-primary-foreground/80">
                Here's what's happening with your events today
              </p>
            </div>
            <Button
              className="bg-white text-primary hover:bg-white/90 font-medium"
              onClick={() => navigate("/create-event")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <Card key={index} className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 bg-primary/10 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Events */}
        <div>
          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">Events</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentEvents?.map((event, index) => (
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
      </div>
    </div>
  );
}
