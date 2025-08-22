import { Calendar, MapPin, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  location: string;
  price: string;
  organizer: string;
  attendees: number;
  rating: number;
  image: string;
  category: string;
}

export default function EventCard({
  title,
  description,
  date,
  location,
  price,
  organizer,
  attendees,
  rating,
  image,
  category,
}: EventCardProps) {
  return (
    <div className="event-card cursor-pointer group">
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/5 rounded-lg mb-4 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
          <Calendar className="h-12 w-12 text-primary/60" />
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
          {category}
        </span>
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 text-warning fill-warning" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
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
          {date}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          {location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-2" />
          {attendees} attending
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">From</p>
          <p className="text-xl font-bold text-primary">{price}</p>
        </div>
        <Button className="btn-accent">View Details</Button>
      </div>
    </div>
  );
}
