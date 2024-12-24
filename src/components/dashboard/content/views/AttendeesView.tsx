import React from 'react';
import { UsersList } from '../../../UsersList';

export function AttendeesView({users,refreshEvents}) {
  return (
    <div>
      <UsersList users={users} refreshEvents={refreshEvents}  />
    </div>
  );
}