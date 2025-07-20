import { Chat, Message, UserPreferences } from './types';
import { STORAGE_KEYS, DEFAULT_USER_PREFERENCES, AVAILABLE_MODELS } from './constants';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateChatTitle = (firstMessage: string): string => {
  const words = firstMessage.split(' ').slice(0, 6);
  return words.join(' ') + (words.length >= 6 ? '...' : '');
};

// Local Storage Utilities
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
};

export const saveChats = (chats: Chat[]): void => {
  saveToLocalStorage(STORAGE_KEYS.CHATS, chats);
};

type StoredChat = Omit<Chat, 'createdAt' | 'updatedAt' | 'messages'> & {
  createdAt: string;
  updatedAt: string;
  messages: Array<Omit<Message, 'timestamp'> & { timestamp: string }>;
};

export const getChats = (): Chat[] => {
  const storedChats = getFromLocalStorage<StoredChat[]>(STORAGE_KEYS.CHATS, []);
  // Convert date strings back to Date objects
  return storedChats.map((chat) => ({
    ...chat,
    createdAt: new Date(chat.createdAt),
    updatedAt: new Date(chat.updatedAt),
    messages: chat.messages.map((message) => ({
      ...message,
      timestamp: new Date(message.timestamp)
    }))
  }));
};

export const savePreferences = (preferences: UserPreferences): void => {
  saveToLocalStorage(STORAGE_KEYS.PREFERENCES, preferences);
};

export const getPreferences = (): UserPreferences => {
  return getFromLocalStorage(STORAGE_KEYS.PREFERENCES, DEFAULT_USER_PREFERENCES);
};

export const createNewChat = (modelId: string, mode: 'chat' | 'research' | 'web'): Chat => {
  const model = AVAILABLE_MODELS.find(m => m.id === modelId) || AVAILABLE_MODELS[0];

  return {
    id: generateId(),
    title: 'New Chat',
    messages: [],
    model,
    mode,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

export const addMessageToChat = (chat: Chat, message: Omit<Message, 'id' | 'timestamp'>): Chat => {
  const newMessage: Message = {
    ...message,
    id: generateId(),
    timestamp: new Date()
  };

  const updatedChat: Chat = {
    ...chat,
    messages: [...chat.messages, newMessage],
    updatedAt: new Date()
  };

  // Update chat title if it's the first message
  if (chat.messages.length === 0 && message.role === 'user') {
    updatedChat.title = generateChatTitle(message.content);
  }

  return updatedChat;
};