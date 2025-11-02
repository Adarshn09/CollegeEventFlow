import { EventCard } from '../EventCard';
import type { Event } from '@shared/schema';
import academicImage from '@assets/generated_images/Academic_lecture_hall_event_84e04169.png';

export default function EventCardExample() {
  const mockEvent: Event = {
    id: '1',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of machine learning and AI with hands-on workshops and real-world examples.',
    category: 'Academic',
    date: 'Nov 15, 2025',
    time: '2:00 PM',
    location: 'Engineering Building, Room 301',
    capacity: 50,
    registered: 38,
    imageUrl: academicImage,
  };

  return <EventCard event={mockEvent} />;
}
