import { Model, UserPreferences } from './types';

export const AVAILABLE_MODELS: Model[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Most capable model for complex reasoning',
    capabilities: ['Reasoning', 'Creativity', 'Analysis']
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient for most tasks',
    capabilities: ['Speed', 'Efficiency', 'General tasks']
  },
  {
    id: 'claude-3',
    name: 'Claude 3',
    description: 'Advanced reasoning and analysis',
    capabilities: ['Analysis', 'Writing', 'Research']
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Google\'s most capable model',
    capabilities: ['Multimodal', 'Reasoning', 'Creativity']
  }
];

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  theme: 'system',
  fontSize: 'medium',
  autoSave: true,
  notifications: true
};

export const STORAGE_KEYS = {
  CHATS: 'chat-interface-chats',
  PREFERENCES: 'chat-interface-preferences',
  CURRENT_CHAT: 'chat-interface-current-chat'
} as const;

export const MODE_DESCRIPTIONS = {
  chat: 'Casual conversation and general assistance',
  research: 'In-depth research with citations and sources',
  web: 'Real-time web search and current information'
} as const;