import React from 'react';
import { UserCard } from './UserCard';

// interface EventListProps {
//   events: Event[];
// }

export function UsersList({ users,refreshEvents}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
      {users.map((user) => (
        <UserCard key={user.id} user={user} refreshEvents={refreshEvents} />
      ))}
    </div>
  );
}