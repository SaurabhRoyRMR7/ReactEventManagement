export const chatStyles = {
  message: {
    container: (isOwnMessage: boolean) =>
      `flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`,
    content: (isOwnMessage: boolean) =>
      `px-4 py-2 rounded-lg max-w-sm ${
        isOwnMessage
          ? 'bg-blue-500 text-white rounded-br-none'
          : 'bg-gray-100 text-gray-900 rounded-bl-none'
      }`,
    avatar: "h-8 w-8 rounded-full mr-2",
    wrapper: (isOwnMessage: boolean) =>
      `flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`,
    sender: "text-sm text-gray-600 mb-1",
    timestamp: "text-xs text-gray-500 mt-1",
  },
  input: {
    container: "border-t border-gray-200 p-4 bg-white",
    wrapper: "flex items-end space-x-2",
    textarea: "flex-1 resize-none border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
    button: "p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
  },
  roomList: {
    container: "border-r border-gray-200 w-64 bg-white overflow-y-auto",
    header: "p-4 border-b border-gray-200",
    title: "text-lg font-semibold",
    list: "divide-y divide-gray-200",
    room: (isActive: boolean) =>
      `w-full text-left p-4 hover:bg-gray-50 focus:outline-none ${
        isActive ? 'bg-blue-50' : ''
      }`,
  },
};