import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar, MapPin, Users, Trash2, Plus } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Event } from "@shared/schema";

export default function AdminManageEvents() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);

  const { data: events = [], isLoading, isError, error } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (eventId: string) => {
      const response = await apiRequest('DELETE', `/api/events/${eventId}`);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Event deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      setDeletingEventId(null);
    },
    onError: (error: Error) => {
      console.error('Delete error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete event. Please try again.",
      });
      setDeletingEventId(null);
    },
  });

  const handleDelete = (eventId: string) => {
    setDeletingEventId(eventId);
    deleteEventMutation.mutate(eventId);
  };

  const categoryColors: Record<string, string> = {
    Academic: "bg-primary/10 text-primary border-primary/20",
    Sports: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    Social: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    Arts: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Manage Events</h1>
            <p className="text-muted-foreground">
              View and manage all campus events
            </p>
          </div>
          <Link href="/admin/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Unable to Load Events</h3>
            <p className="text-muted-foreground mb-4">
              {error instanceof Error ? error.message : 'Failed to fetch events. Please try again later.'}
            </p>
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No events found.</p>
            <Link href="/admin/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Event
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {events.map((event) => (
              <Card key={event.id} className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-48 h-32 md:h-auto flex-shrink-0">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <Badge 
                            variant="outline" 
                            className={categoryColors[event.category] || ""}
                          >
                            {event.category}
                          </Badge>
                          <h3 className="text-2xl font-semibold mt-2 mb-1">
                            {event.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Users className="h-4 w-4" />
                        <span>{event.registered}/{event.capacity} registered</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Link href={`/event/${event.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            disabled={deletingEventId === event.id}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {deletingEventId === event.id ? "Deleting..." : "Delete"}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Event?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{event.title}"? 
                              This will also remove all {event.registered} registration(s) for this event.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(event.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete Event
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

