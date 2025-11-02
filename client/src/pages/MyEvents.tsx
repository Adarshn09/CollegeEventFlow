import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "wouter";
import emptyImage from '@assets/generated_images/Empty_calendar_illustration_ad725fa9.png';

export default function MyEvents() {
  const [studentEmail, setStudentEmail] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentEmail) {
      setSearchSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Events</h1>
          <p className="text-muted-foreground">
            View your event registrations by entering your student email
          </p>
        </div>

        <Card className="p-6 max-w-md mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <Label htmlFor="email">Student Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@university.edu"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                data-testid="input-student-email"
                required
              />
            </div>
            <Button type="submit" className="w-full" data-testid="button-search">
              View My Registrations
            </Button>
          </form>
        </Card>

        {searchSubmitted && (
          <div className="text-center py-12">
            <img
              src={emptyImage}
              alt="No events"
              className="w-48 h-48 mx-auto mb-6 opacity-50"
            />
            <h3 className="text-xl font-semibold mb-2">Feature Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              Registration tracking will be available in the next version.
              For now, please check your email for registration confirmations.
            </p>
            <Link href="/">
              <Button data-testid="button-browse-events">Browse Events</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
