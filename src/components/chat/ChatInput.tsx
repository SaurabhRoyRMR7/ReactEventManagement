import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string,file?: File) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');
 const [file, setFile] = useState<File | null>(null);
 const [filePreview, setFilePreview] = useState<string | null>(null); // State for file preview URL
  // const handleSubmit = () => {
  //   if (message.trim()) {
  //     onSendMessage(message);
  //     setMessage('');
  //   }
  // };
  const handleSubmit = () => {
    if (message.trim() || file) {
      
      onSendMessage(message, file);
      setMessage('');
      setFile(null);
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      if (selectedFile.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(selectedFile));
      } else {
        setFilePreview(null); // Reset preview if not an image
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="flex items-end space-x-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 resize-none border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={1}
        />
        {filePreview ? (
          <div className="flex items-center space-x-2">
            <img src={filePreview} alt="File preview" className="w-8 h-8 object-cover" />
            <span>{file?.name}</span>
          </div>
        ) : (
          file && <span>{file.name}</span> // Display the file name if it's not an image
        )}
         <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer p-2 text-blue-500">
          📎
        </label>
        <button
          onClick={handleSubmit}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}