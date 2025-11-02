import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEventSchema, insertRegistrationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Event routes
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEventById(req.params.id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to create event" });
      }
    }
  });

  // Registration routes
  app.post("/api/registrations", async (req, res) => {
    try {
      const validatedData = insertRegistrationSchema.parse(req.body);
      
      // Check if event exists and has capacity
      const event = await storage.getEventById(validatedData.eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      
      if (event.registered >= event.capacity) {
        return res.status(400).json({ error: "Event is fully booked" });
      }

      // Check if student is already registered for this event
      const existingRegistrations = await storage.getRegistrationsByEventId(validatedData.eventId);
      const alreadyRegistered = existingRegistrations.some(
        reg => reg.studentEmail === validatedData.studentEmail
      );
      
      if (alreadyRegistered) {
        return res.status(400).json({ error: "You are already registered for this event" });
      }

      const registration = await storage.createRegistration(validatedData);
      res.status(201).json(registration);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to create registration" });
      }
    }
  });

  app.get("/api/registrations/student/:email", async (req, res) => {
    try {
      const registrations = await storage.getRegistrationsByStudentEmail(req.params.email);
      
      // Enrich registrations with event details
      const enrichedRegistrations = await Promise.all(
        registrations.map(async (reg) => {
          const event = await storage.getEventById(reg.eventId);
          return {
            ...reg,
            event,
          };
        })
      );
      
      res.json(enrichedRegistrations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch registrations" });
    }
  });

  app.delete("/api/registrations/:id", async (req, res) => {
    try {
      await storage.deleteRegistration(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete registration" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
