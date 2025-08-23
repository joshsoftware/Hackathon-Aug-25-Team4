import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventCard from "./EventCard";
import { categories } from "@/constants/event";
import { useEvents } from "@/hooks/useEvents";

export default function EventDiscovery() {
  const { events } = useEvents(null);

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
                  <Button className="btn-hero h-12 px-8">Search Events</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 lg:px-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div className="flex flex-wrap gap-3 mb-4 md:mb-0">
              <Button variant={"default"} className={"btn-hero"}>
                All
              </Button>
              {categories.map((category, index) => (
                <Button key={index} variant="outline" className="">
                  {category.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">
              Showing {events.length} events
            </h2>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
