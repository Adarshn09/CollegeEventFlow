import { EventDetailHero } from '../EventDetailHero';
import type { Event } from '@shared/schema';
import campusImage from '@assets/generated_images/University_campus_quad_panorama_ce88cce9.png';

export default function EventDetailHeroExample() {
  const mockEvent: Event = {
    id: '1',
    title: 'Fall Festival on the Quad',
    description: 'Join us for our annual fall celebration',
    category: 'Social',
    date: 'Nov 20, 2025',
    time: '5:00 PM',
    location: 'Main Campus Quad',
    capacity: 200,
    registered: 145,
    imageUrl: campusImage,
  };

  return <EventDetailHero event={mockEvent} onRegisterClick={() => console.log('Register clicked')} />;
}
