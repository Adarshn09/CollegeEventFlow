import { Calendar, MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import type { Event } from "@shared/schema";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const spotsLeft = event.capacity - event.registered;
  const percentFilled = (event.registered / event.capacity) * 100;
  
  const categoryColors: Record<string, string> = {
    Academic: "bg-primary/10 text-primary border-primary/20",
    Sports: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    Social: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    Arts: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  };

  const urgencyColor = spotsLeft <= 5 ? "text-destructive" : spotsLeft <= 15 ? "text-chart-4" : "text-muted-foreground";

  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-200" data-testid={`card-event-${event.id}`}>
      <div className="aspect-video overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <Badge 
            variant="outline" 
            className={categoryColors[event.category] || ""}
            data-testid={`badge-category-${event.id}`}
          >
            {event.category}
          </Badge>
          <h3 className="text-xl font-semibold mt-3 mb-2" data-testid={`text-title-${event.id}`}>
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-foreground">
            <Calendar className="h-4 w-4" />
            <span data-testid={`text-date-${event.id}`}>{event.date} at {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <MapPin className="h-4 w-4" />
            <span data-testid={`text-location-${event.id}`}>{event.location}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className={urgencyColor} data-testid={`text-capacity-${event.id}`}>
                {event.registered}/{event.capacity} spots filled
              </span>
            </div>
            {spotsLeft <= 10 && spotsLeft > 0 && (
              <span className={urgencyColor}>Only {spotsLeft} left!</span>
            )}
            {spotsLeft === 0 && (
              <span className="text-destructive font-medium">Fully Booked</span>
            )}
          </div>
          <Progress value={percentFilled} className="h-1" />
        </div>

        <Link href={`/event/${event.id}`} data-testid={`link-event-${event.id}`}>
          <Button className="w-full" disabled={spotsLeft === 0}>
            {spotsLeft === 0 ? "Fully Booked" : "View Details & Register"}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
