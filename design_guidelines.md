# College Event Registration System - Design Guidelines

## Design Approach

**Selected Approach:** Design System (Material Design 3 principles)

**Rationale:** This is a utility-focused application where information clarity, efficient browsing, and streamlined registration are paramount. Students need to quickly scan multiple events, compare details, and complete registration with minimal friction. Material Design's elevation system and structured card patterns excel at organizing dense information while maintaining visual hierarchy.

**Key Design Principles:**
- Information clarity over decorative elements
- Scannable event listings with clear visual hierarchy
- Frictionless registration flow
- Campus-appropriate professional aesthetic
- Mobile-first responsive behavior

---

## Core Design Elements

### A. Typography

**Primary Font:** Inter (Google Fonts)
- Excellent readability for both headings and body text
- Modern, professional appearance suitable for academic context

**Type Scale:**
- Page Titles: text-4xl font-bold (event listing pages, registration confirmation)
- Section Headers: text-2xl font-semibold (category headers, form sections)
- Event Titles: text-xl font-semibold (individual event cards)
- Body Text: text-base font-normal (event descriptions, form labels)
- Metadata: text-sm font-medium (date, time, location, capacity info)
- Small Print: text-xs font-normal (helper text, validation messages)

**Line Height:**
- Headings: leading-tight
- Body text: leading-relaxed for improved readability

---

### B. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16

**Common Patterns:**
- Component internal padding: p-4 to p-6
- Card spacing: p-6 for content area
- Section padding: py-12 to py-16 for major sections
- Grid gaps: gap-6 for event card grids
- Form field spacing: space-y-4 between inputs
- Button padding: px-6 py-3

**Container Widths:**
- Max content width: max-w-7xl mx-auto
- Form containers: max-w-2xl mx-auto
- Event detail pages: max-w-4xl mx-auto

**Grid Systems:**
- Event browse grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Featured events: grid-cols-1 lg:grid-cols-2
- Filtering sidebar + content: 1/4 + 3/4 split on desktop, stacked on mobile

---

### C. Component Library

#### Navigation
**Top Navigation Bar:**
- Fixed position with subtle shadow
- Height: h-16
- Contains: Logo (left), navigation links (center), "My Events" + user menu (right)
- Responsive: Hamburger menu on mobile

#### Event Cards (Primary Component)
**Card Structure:**
- Elevated card with rounded corners (rounded-lg)
- Shadow: shadow-md with hover:shadow-lg transition
- Padding: p-6
- Border: Subtle border for definition

**Card Content Hierarchy:**
1. Event category badge (top, small pill-shaped tag)
2. Event title (text-xl font-semibold)
3. Date/Time row with icon (text-sm, flex layout)
4. Location with icon (text-sm)
5. Brief description (text-sm, 2-line clamp)
6. Bottom row: Capacity indicator + "Register" button

**Capacity Indicator:**
- Progress bar showing registered/total spots
- Text: "23/50 spots filled" with appropriate urgency styling when nearly full
- Visual: Thin progress bar with fill percentage

#### Event Detail Page
**Hero Section:**
- Full-width event banner image (h-64 on desktop, h-48 on mobile)
- Overlay with gradient for text readability
- Event title, date/time prominently displayed over image
- Blurred background button: "Register Now" (large, primary action)

**Content Layout:**
- Two-column on desktop: Main content (2/3) + Registration sidebar (1/3)
- Stacked on mobile
- Main content includes: Full description, agenda/schedule, organizer info
- Sidebar: Quick registration form or "Already registered" status

#### Registration Forms
**Form Design:**
- Clean, single-column layout
- Field groups with clear labels above inputs
- Input fields: Consistent height h-12, rounded-md borders
- Focus states: Ring with brand accent
- Validation: Inline error messages in red below fields
- Success states: Green checkmarks next to valid fields

**Required Fields:**
- Full Name (text input)
- Student Email (email input with .edu validation)
- Student ID (text input with format validation)
- Phone Number (optional, tel input)

**Form Actions:**
- Primary button: "Complete Registration" (full-width on mobile)
- Secondary link: "Cancel" (subtle, left-aligned)

#### Filtering & Search
**Filter Panel:**
- Accordion-style category groups
- Checkboxes for multi-select filters
- Date range picker
- Search input with icon (sticky at top)
- "Clear all filters" link

**Active Filters Display:**
- Pill-shaped tags showing active filters
- X button on each tag to remove
- Positioned above event grid

#### My Events Dashboard
**Layout:**
- Tab navigation: "Upcoming Events" / "Past Events"
- Event cards in chronological order
- Each card includes: "View Details" and "Cancel Registration" actions
- Empty state with illustration and "Browse Events" CTA

#### Admin Event Creation
**Form Layout:**
- Progressive disclosure: Basic Info → Details → Registration Settings
- Image upload area with drag-and-drop
- Rich text editor for description
- Date/time pickers with calendar popup
- Capacity number input with stepper
- Category multi-select dropdown

#### Status Indicators
**Registration Status:**
- Available: Green dot + "Open"
- Limited: Yellow dot + "X spots left"
- Full: Red dot + "Fully Booked"
- Past: Gray dot + "Event Ended"

**User Registration Status:**
- Registered: Green checkmark badge
- Waitlisted: Yellow clock icon
- Cancelled: Gray X icon

#### Buttons
**Primary Actions:**
- Solid background, rounded-md
- Height: h-11 for forms, h-10 for cards
- Padding: px-6
- Font: text-sm font-semibold
- Built-in hover/active states

**Secondary Actions:**
- Outline style with border-2
- Same dimensions as primary

**Tertiary Actions:**
- Text-only links with underline on hover

---

### D. Responsive Behavior

**Breakpoint Strategy:**
- Mobile (default): Single column, stacked layouts
- Tablet (md: 768px): 2-column event grids, show more navigation items
- Desktop (lg: 1024px): 3-column grids, sidebar filters, full navigation

**Mobile Optimizations:**
- Bottom navigation bar for key actions
- Swipeable event cards
- Sticky filter button that opens modal
- Touch-friendly tap targets (minimum 44px)

---

### E. Images

**Hero Image (Event Detail Pages):**
- Full-width banner showcasing event theme/activity
- Aspect ratio: 21:9 on desktop, 16:9 on mobile
- Overlay gradient: Dark gradient from bottom for text legibility
- Placement: Top of event detail page spanning full width
- Description: Campus life photography - students at events, engaging in activities, vibrant campus scenes

**Event Card Thumbnails:**
- Aspect ratio: 16:9
- Placement: Top of each event card
- Description: Categorized imagery - academic events (lecture halls, books), sports (athletic activities), social (gatherings, celebrations), arts (performances, exhibitions)

**Empty State Illustrations:**
- Placement: "My Events" page when no registrations exist
- Description: Friendly illustration of calendar with checkmark or students browsing events
- Style: Simple line art, not photographic

**No Large Hero on Homepage:** The browse page leads directly with search/filter and event grid for maximum utility

---

### F. Animation Guidelines

**Use Sparingly:**
- Card hover: Subtle lift (translate-y-1) with shadow transition
- Button interactions: Built-in states only, no custom animations
- Page transitions: Simple fade-in for content load
- Modal entry: Scale from 95% to 100% with opacity fade

**Avoid:**
- Scroll-triggered animations
- Loading spinners beyond essential data fetches
- Auto-playing carousels
- Parallax effects

---

## Implementation Notes

**Icon Library:** Heroicons (outline style for most UI, solid for active states)

**Accessibility:**
- Form labels always visible (not placeholder-only)
- Sufficient contrast ratios for all text
- Keyboard navigation support for all interactive elements
- ARIA labels for icon-only buttons
- Focus indicators clearly visible

**Performance:**
- Lazy load event card images
- Paginate event listings (20 events per page)
- Optimize uploaded event images server-side

This design prioritizes student efficiency while maintaining a polished, campus-appropriate aesthetic that scales from mobile to desktop seamlessly.