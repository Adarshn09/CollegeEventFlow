import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { EventDetailHero } from "@/components/EventDetailHero";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import type { Event } from "@shared/schema";

export default function EventDetail() {
  const [, params] = useRoute("/event/:id");
  const registrationRef = useRef<HTMLDivElement>(null);

  const { data: event, isLoading, isError, error } = useQuery<Event>({
    queryKey: ['/api/events', params?.id],
    enabled: !!params?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading event...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Unable to Load Event</h1>
          <p className="text-muted-foreground mb-4">
            {error instanceof Error ? error.message : 'Failed to load event. Please try again later.'}
          </p>
          <Link href="/">
            <Button data-testid="button-back-to-events">Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Event Not Found</h1>
          <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist.</p>
          <Link href="/">
            <Button data-testid="button-back-to-events">Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <EventDetailHero event={event} onRegisterClick={scrollToRegistration} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Date & Time</dt>
                  <dd className="text-foreground">{event.date} at {event.time}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Location</dt>
                  <dd className="text-foreground">{event.location}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                  <dd className="text-foreground">{event.category}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Capacity</dt>
                  <dd className="text-foreground">
                    {event.registered} / {event.capacity} registered
                    {event.capacity - event.registered > 0 && (
                      <span className="text-muted-foreground ml-2">
                        ({event.capacity - event.registered} spots available)
                      </span>
                    )}
                  </dd>
                </div>
              </dl>
            </Card>
          </main>

          <aside ref={registrationRef}>
            <div className="sticky top-20">
              <RegistrationForm
                eventId={event.id}
                eventTitle={event.title}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
