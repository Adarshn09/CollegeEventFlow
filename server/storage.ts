import { type Event, type InsertEvent, type Registration, type InsertRegistration } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Events
  getAllEvents(): Promise<Event[]>;
  getEventById(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEventRegistrationCount(eventId: string, increment: number): Promise<void>;
  
  // Registrations
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistrationsByStudentEmail(studentEmail: string): Promise<Registration[]>;
  getRegistrationsByEventId(eventId: string): Promise<Registration[]>;
  deleteRegistration(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private events: Map<string, Event>;
  private registrations: Map<string, Registration>;

  constructor() {
    this.events = new Map();
    this.registrations = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed with initial events
    const initialEvents: Event[] = [
      {
        id: randomUUID(),
        title: 'Introduction to Machine Learning',
        description: 'Join us for an comprehensive introduction to machine learning and artificial intelligence. This workshop will cover fundamental concepts including supervised and unsupervised learning, neural networks, and practical applications.',
        category: 'Academic',
        date: 'Nov 15, 2025',
        time: '2:00 PM',
        location: 'Engineering Building, Room 301',
        capacity: 50,
        registered: 0,
        imageUrl: '/generated_images/Academic_lecture_hall_event_84e04169.png',
      },
      {
        id: randomUUID(),
        title: 'Basketball Tournament Finals',
        description: 'The moment we\'ve all been waiting for! Watch the top two teams compete in the championship game of our annual basketball tournament.',
        category: 'Sports',
        date: 'Nov 18, 2025',
        time: '6:00 PM',
        location: 'Athletic Center, Main Court',
        capacity: 100,
        registered: 0,
        imageUrl: '/generated_images/College_basketball_sports_event_b0a22dbd.png',
      },
      {
        id: randomUUID(),
        title: 'Fall Festival on the Quad',
        description: 'Celebrate the autumn season with the entire campus community! Our annual Fall Festival features local food trucks serving diverse cuisines, live music performances, and much more.',
        category: 'Social',
        date: 'Nov 20, 2025',
        time: '5:00 PM',
        location: 'Main Campus Quad',
        capacity: 200,
        registered: 0,
        imageUrl: '/generated_images/Campus_social_festival_gathering_5dc4227c.png',
      },
      {
        id: randomUUID(),
        title: 'Student Theater Production: Hamlet',
        description: 'The Drama Department presents Shakespeare\'s timeless tragedy, directed by Professor Martinez and featuring our most talented student performers.',
        category: 'Arts',
        date: 'Nov 22, 2025',
        time: '7:30 PM',
        location: 'Performing Arts Center',
        capacity: 150,
        registered: 0,
        imageUrl: '/generated_images/Student_theater_arts_performance_a536f2bf.png',
      },
      {
        id: randomUUID(),
        title: 'Career Fair 2025',
        description: 'Connect with over 100 employers from Fortune 500 companies to innovative startups. This premier networking event offers opportunities to explore internships and full-time positions.',
        category: 'Academic',
        date: 'Nov 25, 2025',
        time: '10:00 AM',
        location: 'Student Union Ballroom',
        capacity: 300,
        registered: 0,
        imageUrl: '/generated_images/University_campus_quad_panorama_ce88cce9.png',
      },
      {
        id: randomUUID(),
        title: 'Intramural Soccer League Kickoff',
        description: 'Sign up your team for our recreational soccer league! Whether you\'re a seasoned player or just looking for fun exercise, our league welcomes all skill levels.',
        category: 'Sports',
        date: 'Nov 27, 2025',
        time: '4:00 PM',
        location: 'South Field',
        capacity: 80,
        registered: 0,
        imageUrl: '/generated_images/College_basketball_sports_event_b0a22dbd.png',
      },
    ];

    initialEvents.forEach(event => {
      this.events.set(event.id, event);
    });
  }

  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEventById(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = { 
      ...insertEvent, 
      id,
      registered: 0,
    };
    this.events.set(id, event);
    return event;
  }

  async updateEventRegistrationCount(eventId: string, increment: number): Promise<void> {
    const event = this.events.get(eventId);
    if (event) {
      event.registered += increment;
      this.events.set(eventId, event);
    }
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const id = randomUUID();
    const registration: Registration = {
      ...insertRegistration,
      phoneNumber: insertRegistration.phoneNumber || null,
      id,
      registeredAt: new Date(),
    };
    this.registrations.set(id, registration);
    
    // Update event registration count
    await this.updateEventRegistrationCount(insertRegistration.eventId, 1);
    
    return registration;
  }

  async getRegistrationsByStudentEmail(studentEmail: string): Promise<Registration[]> {
    return Array.from(this.registrations.values()).filter(
      (reg) => reg.studentEmail === studentEmail
    );
  }

  async getRegistrationsByEventId(eventId: string): Promise<Registration[]> {
    return Array.from(this.registrations.values()).filter(
      (reg) => reg.eventId === eventId
    );
  }

  async deleteRegistration(id: string): Promise<void> {
    const registration = this.registrations.get(id);
    if (registration) {
      this.registrations.delete(id);
      await this.updateEventRegistrationCount(registration.eventId, -1);
    }
  }
}

export const storage = new MemStorage();
