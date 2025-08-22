import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Star,
  Grid,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventCard from "./EventCard";

export default function EventDiscovery() {
  const mockEvents = [
    {
      title: "Tech Innovation Conference 2024",
      description:
        "Join industry leaders for cutting-edge discussions on AI, blockchain, and the future of technology. Network with 500+ professionals.",
      date: "March 15, 2024",
      location: "San Francisco, CA",
      price: "$299",
      organizer: "TechCorp Events",
      attendees: 487,
      rating: 4.9,
      image: "/api/placeholder/400/300",
      category: "Technology",
    },
    {
      title: "Summer Music Festival",
      description:
        "Three days of incredible live music featuring top artists from around the world. Food trucks, art installations, and more.",
      date: "June 21-23, 2024",
      location: "Austin, TX",
      price: "$149",
      organizer: "Music Festivals Inc",
      attendees: 2340,
      rating: 4.8,
      image: "/api/placeholder/400/300",
      category: "Music",
    },
    {
      title: "Digital Marketing Workshop",
      description:
        "Learn the latest digital marketing strategies from industry experts. Hands-on sessions and practical takeaways included.",
      date: "April 8, 2024",
      location: "New York, NY",
      price: "$89",
      organizer: "Marketing Academy",
      attendees: 156,
      rating: 4.7,
      image: "/api/placeholder/400/300",
      category: "Business",
    },
    {
      title: "Art & Design Exhibition",
      description:
        "Explore contemporary art and design from emerging and established artists. Opening reception with wine and networking.",
      date: "March 28, 2024",
      location: "Los Angeles, CA",
      price: "$25",
      organizer: "Modern Art Gallery",
      attendees: 234,
      rating: 4.6,
      image: "/api/placeholder/400/300",
      category: "Arts",
    },
    {
      title: "Startup Pitch Competition",
      description:
        "Watch innovative startups pitch to investors and compete for $100k in funding. Network with entrepreneurs and VCs.",
      date: "May 12, 2024",
      location: "Seattle, WA",
      price: "Free",
      organizer: "Venture Capital Network",
      attendees: 345,
      rating: 4.8,
      image: "/api/placeholder/400/300",
      category: "Business",
    },
    {
      title: "Food & Wine Festival",
      description:
        "Taste exceptional cuisine from renowned chefs paired with premium wines. Cooking demonstrations and tastings all day.",
      date: "July 14, 2024",
      location: "Napa Valley, CA",
      price: "$199",
      organizer: "Culinary Events",
      attendees: 567,
      rating: 4.9,
      image: "/api/placeholder/400/300",
      category: "Food & Drink",
    },
  ];

  const categories = [
    "All",
    "Technology",
    "Music",
    "Business",
    "Arts",
    "Food & Drink",
    "Sports",
    "Education",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Search Section */}
      <section className="bg-gradient-hero py-16 px-4 lg:px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Discover Amazing Events
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Find events that inspire, educate, and entertain you
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-xl p-2 shadow-elevated max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center">
                  <Search className="h-5 w-5 text-muted-foreground ml-4 mr-2" />
                  <Input
                    placeholder="Search events, organizers, or keywords..."
                    className="border-0 text-lg focus-visible:ring-0"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <MapPin className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <Calendar className="h-5 w-5" />
                  </Button>
                  <Button className="btn-hero h-12 px-8">Search Events</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-12 px-4 lg:px-6">
        <div className="container mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div className="flex flex-wrap gap-3 mb-4 md:mb-0">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  className={index === 0 ? "btn-hero" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">
              Showing {mockEvents.length} events
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Sort by:
              <Button variant="ghost" className="font-medium">
                Relevance
              </Button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="px-8 py-3">
              Load More Events
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
