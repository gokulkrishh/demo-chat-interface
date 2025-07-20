'use client';

import { Message } from '../lib/types';
import { formatTimestamp } from '../lib/utils';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <div className="flex gap-4">
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            isUser
              ? 'bg-blue-500 text-white'
              : 'bg-black dark:bg-white text-white dark:text-black'
          }`}
        >
          {isUser ? 'You' : 'AI'}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </div>

          {/* Citations for research mode */}
          {message.citations && message.citations.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sources:
              </div>
              <div className="space-y-1">
                {message.citations.map((citation, index) => (
                  <a
                    key={index}
                    href={citation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    [{index + 1}] {citation}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
