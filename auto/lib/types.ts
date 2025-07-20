export type MessageRole = 'user' | 'assistant' | 'system';

export type Message = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  citations?: string[];
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  model: Model;
  mode: Mode;
  createdAt: Date;
  updatedAt: Date;
};

export type Model = {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
};

export type Mode = 'chat' | 'research' | 'web';

export type UserPreferences = {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  autoSave: boolean;
  notifications: boolean;
};

export type ChatSettings = {
  model: Model;
  mode: Mode;
  temperature: number;
  maxTokens: number;
};