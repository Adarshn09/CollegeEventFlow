import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import BrowseEvents from "@/pages/BrowseEvents";
import EventDetail from "@/pages/EventDetail";
import MyEvents from "@/pages/MyEvents";
import AdminEventForm from "@/pages/AdminEventForm";
import AdminManageEvents from "@/pages/AdminManageEvents";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={BrowseEvents} />
      <Route path="/event/:id" component={EventDetail} />
      <Route path="/my-events" component={MyEvents} />
      <Route path="/admin" component={AdminManageEvents} />
      <Route path="/admin/create" component={AdminEventForm} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
