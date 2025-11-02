# Campus Event Registration System

## Overview

This is a college event registration system that allows students to browse campus events, register for activities, and manage their event participation. The application enables administrators to create and manage events across multiple categories (Academic, Sports, Social, Arts). Built with a modern tech stack, it provides a mobile-first, responsive interface focused on information clarity and streamlined registration workflows.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing (alternative to React Router)

**UI Component System**
- shadcn/ui (New York variant) - A collection of accessible, customizable components built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Material Design 3 principles guide the overall design approach
- Inter font family (Google Fonts) for consistent typography

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management, caching, and data synchronization
- Custom query client configuration with infinite stale time and disabled automatic refetching
- React Hook Form with Zod validation for form state management

**Design System**
- Custom color system with HSL-based theming supporting light/dark modes
- Consistent spacing primitives using Tailwind units (2, 4, 6, 8, 12, 16)
- Standardized elevation system using CSS custom properties (--elevate-1, --elevate-2)
- Type scale ranging from text-xs to text-4xl with semantic font weights

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server
- TypeScript for type safety across the full stack
- ESM (ES Modules) for modern JavaScript module system

**API Design**
- RESTful API endpoints following resource-based URL patterns
- JSON request/response format
- Centralized error handling with appropriate HTTP status codes
- Request/response logging middleware for debugging

**Data Validation**
- Zod schemas for runtime type validation
- Shared schema definitions between client and server (in `/shared` directory)
- Integration with Drizzle ORM's schema inference

**Storage Layer**
- In-memory storage implementation (`MemStorage` class) for development/demo
- Interface-based storage abstraction (`IStorage`) allowing easy swapping of persistence mechanisms
- Seeded with initial event data for immediate usability

### Data Storage

**Database Schema (Drizzle ORM)**
- PostgreSQL dialect configuration
- Two main tables:
  - `events`: Stores event details (title, description, category, date, time, location, capacity, registration count, image)
  - `registrations`: Stores student registrations (student info, event reference, timestamp)
- UUID-based primary keys using PostgreSQL's `gen_random_uuid()`
- Timestamp tracking for registration history

**ORM Choice Rationale**
- Drizzle ORM provides type-safe SQL queries with minimal runtime overhead
- Schema-first approach with automatic TypeScript type inference
- Integration with Zod for validation through `drizzle-zod` package
- Migration support via `drizzle-kit`

**Current Implementation Note**
- The application currently uses in-memory storage as the primary implementation
- Database configuration is present but database integration can be added by implementing a `DbStorage` class that conforms to the `IStorage` interface

### Authentication & Authorization

**Current State**: No authentication system implemented. The application operates as a public-facing event browser with open registration.

**Access Control**
- Admin routes (`/admin`) are publicly accessible without authentication
- Student email verification relies on `.edu` domain validation in the registration form
- No session management or user accounts

**Future Considerations**
- Session-based authentication could be added (infrastructure present: `connect-pg-simple` for PostgreSQL session storage)
- Role-based access control for admin vs. student functions

### External Dependencies

**UI Component Libraries**
- @radix-ui/* packages: Unstyled, accessible component primitives (dialogs, dropdowns, popovers, etc.)
- lucide-react: Icon library for consistent iconography
- cmdk: Command palette component for search interfaces
- embla-carousel-react: Touch-friendly carousel component

**Form & Validation**
- react-hook-form: Performant form state management
- @hookform/resolvers: Integration layer for validation libraries
- zod: TypeScript-first schema validation

**Data Fetching**
- @tanstack/react-query: Server state management and caching
- Custom `apiRequest` helper function for consistent fetch API usage

**Database & ORM**
- drizzle-orm: TypeScript ORM for PostgreSQL
- drizzle-zod: Bridge between Drizzle schemas and Zod validation
- @neondatabase/serverless: Serverless PostgreSQL driver (configured for potential Neon database usage)
- drizzle-kit: CLI tool for schema migrations

**Utilities**
- date-fns: Date manipulation and formatting
- class-variance-authority: Type-safe variant styling for components
- clsx + tailwind-merge: Conditional className composition
- nanoid: Unique ID generation

**Development Tools**
- tsx: TypeScript execution for Node.js
- esbuild: Fast JavaScript bundler for production builds
- @replit/vite-plugin-* packages: Replit-specific development enhancements (error overlays, dev banner, cartographer)

**Styling**
- tailwindcss: Utility-first CSS framework
- autoprefixer: PostCSS plugin for vendor prefixes