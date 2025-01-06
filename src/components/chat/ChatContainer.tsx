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
    usersInRoom,
    setUsersInRoom,
    showUsers,
    setShowUsers

  } = useChat();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat Room List - Sidebar with improved style */}
      <div className="w-1/3 h-screen overflow-y-auto border-r bg-white shadow-md rounded-r-lg scrollbar-hide">
        <ChatRoomList
          rooms={rooms}
          activeRoomId={activeRoomId}
          onRoomSelect={setActiveRoomId}
        />
      </div>

      {/* Chat Room Area */}
      <div className="flex-1 flex flex-col h-screen bg-gray-50">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white shadow-md rounded-l-lg scrollbar-hide">
          <ChatRoom
            messages={messages}
            onSendMessage={handleSendMessage}
            currentUserId={currentUserId}
            activeRoomId={activeRoomId}
            usersInRoom={usersInRoom}
            setShowUsers={setShowUsers}
            showUsers={showUsers}

          />
        </div>
      </div>
    </div>
  );
}