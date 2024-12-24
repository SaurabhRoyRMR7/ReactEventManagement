import React from 'react';
import { ChatRoom } from './ChatRoom';
import { ChatRoomList } from './ChatRoomList';
import { useChat } from './hooks/useChat';

export function ChatContainer() {
  const {
    activeRoomId,
    setActiveRoomId,
    messages,
    currentUserId,
    handleSendMessage,
    rooms,
  } = useChat();

  return (
    <div className="flex h-full bg-gray-100">
      <ChatRoomList
        rooms={rooms}
        activeRoomId={activeRoomId}
        onRoomSelect={setActiveRoomId}
      />
      <ChatRoom
        messages={messages}
        onSendMessage={handleSendMessage}
        currentUserId={currentUserId}
      />
    </div>
  );
}