import React from 'react';
import { Message } from '../../types/chat';
// import { formatDistanceToNow } from '../dashboard/utils/dateFormatters';
import { DEFAULT_AVATAR } from '../dashboard/utils/constants';
import { FaRegClock } from 'react-icons/fa6';
import { User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

export function ChatMessage({ message, isOwnMessage }: ChatMessageProps) {
  //  console.log(message.timestamp,'message timestamp');
  //  console.log(new Date(message.timestamp));
  //  console.log(new Date(),'now check')
  //  const messageTimestamp = "2025-01-03T08:55:06.589Z"; // Example backend timestamp
const localTimestamp = new Date();  // Get the current local time
// console.log("Backend timestamp:", new Date(message.timestamp));
// console.log("Local timestamp:", localTimestamp);

const formattedTime = formatDistanceToNow(new Date(message.timestamp), { addSuffix: true });
console.log(formattedTime,'formateed console');
  return (
    <div
    key={message.id}
    className={`flex ${isOwnMessage? 'justify-end' : 'justify-start'}`}
  >
    <div
      className={`max-w-xs p-3 rounded-lg mb-2 ${
        isOwnMessage ? 'bg-blue-100' : 'bg-gray-100'
      }`}
    >
      <div className="flex items-center space-x-2">
        {/* {!isOwnMessage && (
          // <img
          //   src={`https://randomuser.me/api/portraits/men/${message.senderId}.jpg`}
          //   alt="sender"
          //   className="w-8 h-8 rounded-full"
          // />
        )} */}
        <span className="text-sm font-medium">{message.senderName}</span>
      </div>
      <p className="text-sm text-gray-700">{message.content}</p>
      {message.fileDetails && (
          <div className="mt-2">
            {message.fileDetails.fileType === 1 ? ( // Image
              <img src={`data:image/jpeg;base64,${message.fileDetails.fileData}`} alt="file" className="w-32 h-32 object-cover" />
            ) : message.fileDetails.fileType === 2 ? ( // Video
              <video controls className="w-full h-32">
                <source src={`data:video/mp4;base64,${message.fileDetails.fileData}`} />
              </video>
            ) : ( // Other file types
              <a href={`data:application/octet-stream;base64,${message.fileDetails.fileData}`} download={message.fileDetails.fileName}>
                Download {message.fileDetails.fileName}
              </a>
            )}
          </div>
        )}
      <div className="text-xs text-gray-400 mt-1 flex justify-between items-center">
      <FaRegClock className="w-3 h-3 text-gray-400" />
        <span>{formattedTime}</span>
        </div>
    </div>
  </div>
  );
}
