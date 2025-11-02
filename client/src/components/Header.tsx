import { Link, useLocation } from "wouter";
import { Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">Campus Events</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <Link href="/" data-testid="link-browse">
              <Button variant={location === "/" ? "secondary" : "ghost"}>
                Browse Events
              </Button>
            </Link>
            <Link href="/my-events" data-testid="link-my-events">
              <Button variant={location === "/my-events" ? "secondary" : "ghost"}>
                <User className="h-4 w-4 mr-2" />
                My Events
              </Button>
            </Link>
            <Link href="/admin" data-testid="link-admin">
              <Button variant={location === "/admin" ? "secondary" : "ghost"}>
                Admin
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
