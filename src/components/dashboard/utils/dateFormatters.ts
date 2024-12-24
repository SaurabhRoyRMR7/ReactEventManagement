import { formatDistanceToNow as formatDistance } from 'date-fns';

export const formatDistanceToNow = (date: Date) => {
  return formatDistance(date, { addSuffix: true });
};