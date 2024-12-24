export const viewTitles: Record<string, string> = {
  events: 'My Events',
  create: 'Create Event',
  attendees: 'Attendees',
  'all-events': 'All Events',
  settings: 'Settings',
  'registered-events': 'Registered Events',
  'upcoming-events': 'Upcoming Events'
};

export const getViewTitle = (view: string): string => {
  return viewTitles[view] || 'Dashboard';
};