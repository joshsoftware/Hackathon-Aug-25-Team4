import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, BarChart3, CreditCard } from "lucide-react";

const Index = () => {
  const featuredEvents = [
    {
      title: "Tech Innovation Summit 2024",
      description: "Join industry leaders and innovators for a day of cutting-edge technology discussions and networking opportunities.",
      date: "March 15, 2024",
      location: "San Francisco, CA",
      price: "$299",
      organizer: "TechCorp Events",
      attendees: 487,
      rating: 4.9,
      image: "/api/placeholder/400/300",
      category: "Technology"
    },
    {
      title: "Creative Arts Workshop",
      description: "Explore your creative side with hands-on workshops led by professional artists and designers.",
      date: "March 22, 2024",
      location: "New York, NY",
      price: "$89",
      organizer: "Creative Studios",
      attendees: 156,
      rating: 4.8,
      image: "/api/placeholder/400/300",
      category: "Arts"
    },
    {
      title: "Startup Networking Event",
      description: "Connect with entrepreneurs, investors, and innovators in the startup ecosystem.",
      date: "April 5, 2024",
      location: "Austin, TX",
      price: "Free",
      organizer: "Startup Community",
      attendees: 234,
      rating: 4.7,
      image: "/api/placeholder/400/300",
      category: "Business"
    }
  ];

  const features = [
    {
      icon: Calendar,
      title: "Easy Event Creation",
      description: "Create professional events in minutes with our intuitive event builder"
    },
    {
      icon: Users,
      title: "Audience Management",
      description: "Manage attendees, send notifications, and track engagement seamlessly"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track ticket sales, revenue, and event performance with detailed insights"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Accept payments with confidence using our secure payment processing"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Featured Events Section */}
      <section className="py-20 px-4 lg:px-6 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Events
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover amazing events happening near you and around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>

          <div className="text-center">
            <Button className="btn-hero text-lg px-8 py-4">
              View All Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features for Organizers */}
      <section className="py-20 px-4 lg:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Create{" "}
              <span className="gradient-text">Amazing Events</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools you need to plan, 
              manage, and execute successful events from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center fade-in">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:px-6 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Create Your Next Event?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who trust EventHub to bring their 
            vision to life and create memorable experiences
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
              Start Creating Events
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
