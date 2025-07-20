'use client'

import { User, Bot } from 'lucide-react'
import { Message } from '../lib/types'
import { cn } from '../lib/utils'

interface ChatMessageProps {
  message: Message
  isLast: boolean
}

export function ChatMessage({ message, isLast }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn(
      "flex gap-4 p-4",
      isUser ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-900"
    )}>
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        {isUser ? (
          <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Bot className="w-5 h-5 text-blue-600" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        
        {message.citations && message.citations.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sources
            </h4>
            <div className="space-y-1">
              {message.citations.map((citation) => (
                <a
                  key={citation.id}
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="font-medium text-blue-600 dark:text-blue-400">
                    {citation.title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {citation.snippet}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}
