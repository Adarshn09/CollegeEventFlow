import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Event } from "@shared/schema";

interface EventDetailHeroProps {
  event: Event;
  onRegisterClick: () => void;
}

export function EventDetailHero({ event, onRegisterClick }: EventDetailHeroProps) {
  const spotsLeft = event.capacity - event.registered;
  
  return (
    <div className="relative h-64 md:h-80 overflow-hidden">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="container mx-auto px-4 pb-8">
          <Badge variant="outline" className="mb-3 bg-background/90 backdrop-blur-sm">
            {event.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-testid="text-event-title">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-white/90 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{event.date} at {event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>{event.registered}/{event.capacity} registered</span>
            </div>
          </div>
          <Button
            size="lg"
            onClick={onRegisterClick}
            disabled={spotsLeft === 0}
            className="bg-primary/90 backdrop-blur-sm hover:bg-primary"
            data-testid="button-register-hero"
          >
            {spotsLeft === 0 ? "Event Fully Booked" : "Register Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
