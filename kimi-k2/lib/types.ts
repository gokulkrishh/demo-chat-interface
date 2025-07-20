export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  citations?: Citation[];
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  model: AIModel;
  mode: ChatMode;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export type ChatMode = 'chat' | 'research' | 'web';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  defaultModel: string;
  defaultMode: ChatMode;
  autoSave: boolean;
}

export interface Citation {
  id: string;
  title: string;
  url: string;
  snippet: string;
}