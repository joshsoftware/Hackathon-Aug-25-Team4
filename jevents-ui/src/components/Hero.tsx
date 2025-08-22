import { ArrowRight, Calendar, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero-gradient py-20 px-4 lg:px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Create Amazing <span className="gradient-text">Events</span> That
            People Love
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            The complete event management platform for organizers and
            event-goers. Create, manage, and discover extraordinary experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/create-event">
              <Button className="btn-hero text-lg px-8 py-4">
                Start Creating Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link to="/events">
              <Button
                variant="outline"
                className="text-lg px-8 py-4 bg-background/80"
              >
                Explore Events
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto slide-up">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy Event Creation</h3>
              <p className="text-muted-foreground text-sm">
                Create professional events in minutes with our intuitive builder
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Audience Management</h3>
              <p className="text-muted-foreground text-sm">
                Manage tickets, refunds, and notifications seamlessly
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-warning" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-muted-foreground text-sm">
                Track sales, engagement, and revenue with detailed reports
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

