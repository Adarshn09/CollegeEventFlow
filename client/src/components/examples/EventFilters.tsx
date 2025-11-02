import { EventFilters } from '../EventFilters';
import { useState } from 'react';

export default function EventFiltersExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <EventFilters
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
      onClearFilters={() => {
        setSearchQuery('');
        setSelectedCategories([]);
      }}
    />
  );
}
