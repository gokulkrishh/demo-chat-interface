'use client';

import { useState, useEffect, useRef } from 'react';
import { Chat, Message, Model, Mode, UserPreferences } from '../lib/types';
import {
  AVAILABLE_MODELS,
  DEFAULT_USER_PREFERENCES,
  STORAGE_KEYS,
} from '../lib/constants';
import {
  getChats,
  saveChats,
  getPreferences,
  savePreferences,
  createNewChat,
  addMessageToChat,
} from '../lib/utils';
import Sidebar from './sidebar';
import ChatMessage from './chat-message';
import ChatInput from './chat-input';

const ChatInterface = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>(
    DEFAULT_USER_PREFERENCES,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedChats = getChats();
    const savedPreferences = getPreferences();

    setChats(savedChats);
    setPreferences(savedPreferences);

    // Set current chat to the most recent one or create a new one
    if (savedChats.length > 0) {
      setCurrentChat(savedChats[0]);
    } else {
      const newChat = createNewChat(AVAILABLE_MODELS[0].id, 'chat');
      setCurrentChat(newChat);
      setChats([newChat]);
    }
  }, []);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    if (chats.length > 0) {
      saveChats(chats);
    }
  }, [chats]);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    savePreferences(preferences);
  }, [preferences]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const handleNewChat = () => {
    const newChat = createNewChat(AVAILABLE_MODELS[0].id, 'chat');
    setCurrentChat(newChat);
    setChats([newChat, ...chats]);
    setIsSidebarOpen(false);
  };

  const handleChatSelect = (chatId: string) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      setCurrentChat(chat);
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteChat = (chatId: string) => {
    const updatedChats = chats.filter((c) => c.id !== chatId);
    setChats(updatedChats);

    if (currentChat?.id === chatId) {
      setCurrentChat(updatedChats[0] || null);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!currentChat) return;

    setIsLoading(true);

    // Add user message
    const updatedChat = addMessageToChat(currentChat, {
      role: 'user',
      content,
    });

    const currentChatId = currentChat.id;
    const currentModelName = currentChat.model.name;
    const currentMode = currentChat.mode;

    setCurrentChat(updatedChat);
    setChats(chats.map((c) => (c.id === currentChatId ? updatedChat : c)));

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Omit<Message, 'id' | 'timestamp'> = {
        role: 'assistant',
        content: `This is a simulated response from ${currentModelName} in ${currentMode} mode. In a real implementation, this would be an actual AI response.`,
        citations:
          currentMode === 'research'
            ? ['https://example.com/source1', 'https://example.com/source2']
            : undefined,
      };

      const finalChat = addMessageToChat(updatedChat, aiResponse);
      setCurrentChat(finalChat);
      setChats(chats.map((c) => (c.id === currentChatId ? finalChat : c)));
      setIsLoading(false);
    }, 1000);
  };

  const handlePreferencesChange = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-800">
      {/* Sidebar */}
      <Sidebar
        chats={chats}
        currentChatId={currentChat?.id || null}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        preferences={preferences}
        onPreferencesChange={handlePreferencesChange}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Simple Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Open sidebar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900 dark:text-white">
              ChatGPT
            </span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <div></div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {!currentChat || currentChat.messages.length === 0 ? (
            <div className="flex items-center justify-center h-full px-4">
              <div className="text-center max-w-3xl w-full">
                <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl">✨</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  How can I help you today?
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-2xl mx-auto">
                  <button
                    onClick={() => handleSendMessage('Help with brainstorming')}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
                  >
                    <div className="text-lg mb-2">💡</div>
                    <div className="font-medium text-gray-900 dark:text-white mb-1">
                      Get creative
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Help with brainstorming
                    </div>
                  </button>

                  <button
                    onClick={() => handleSendMessage('Explain a concept')}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
                  >
                    <div className="text-lg mb-2">📚</div>
                    <div className="font-medium text-gray-900 dark:text-white mb-1">
                      Learn something
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Explain concepts
                    </div>
                  </button>

                  <button
                    onClick={() => handleSendMessage('Write content for me')}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
                  >
                    <div className="text-lg mb-2">✍️</div>
                    <div className="font-medium text-gray-900 dark:text-white mb-1">
                      Write content
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Draft and edit text
                    </div>
                  </button>

                  <button
                    onClick={() => handleSendMessage('Help me debug code')}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
                  >
                    <div className="text-lg mb-2">💻</div>
                    <div className="font-medium text-gray-900 dark:text-white mb-1">
                      Code help
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Debug and develop
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="pb-32">
              {currentChat?.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && currentChat && (
                <div className="px-4 py-6 max-w-3xl mx-auto">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center">
                      <span className="text-white dark:text-black text-xs">
                        AI
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mt-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          placeholder="Message ChatGPT"
        />
      </div>
    </div>
  );
};

export default ChatInterface;
