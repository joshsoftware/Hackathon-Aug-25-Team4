import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EventTime } from "./EventTime";

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  category: string;
  image_url?: string | null;
}

export default function EventCard({
  id,
  title,
  description,
  location,
  start_time,
  end_time,
  category,
  image_url,
}: EventCardProps) {
  return (
    <div className="event-card cursor-pointer group">
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/5 rounded-lg mb-4 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
          {image_url ? (
            <img
              src={image_url}
              alt="Event cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <Calendar className="h-12 w-12 text-primary/60" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
          {category}
        </span>
      </div>

      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <EventTime start_time={start_time} end_time={end_time} />
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          {location}
        </div>

        {/*
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-2" />
          {attendees} attending
        </div>
        */}
      </div>

      <div className="flex items-center justify-between">
        <Link to={`/event/${id}`}>
          <Button className="btn-accent">View Details</Button>
        </Link>
      </div>
    </div>
  );
}
