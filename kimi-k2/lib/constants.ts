import { AIModel, ChatMode } from './types'

export const AI_MODELS: AIModel[] = [
  {
    id: 'kimi-k2',
    name: 'Kimi K2',
    description: 'Advanced reasoning and analysis',
    icon: '🧠',
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Creative and conversational',
    icon: '💬',
  },
  {
    id: 'claude-3',
    name: 'Claude 3',
    description: 'Thoughtful and nuanced',
    icon: '🎯',
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Multimodal capabilities',
    icon: '🔮',
  },
]

export const CHAT_MODES = [
  {
    mode: 'chat' as const,
    label: 'Chat',
    description: 'Casual conversation',
    icon: '💭',
  },
  {
    mode: 'research' as const,
    label: 'Research',
    description: 'In-depth analysis with citations',
    icon: '🔍',
  },
  {
    mode: 'web' as const,
    label: 'Web',
    description: 'Real-time web queries',
    icon: '🌐',
  },
]

export const DEFAULT_PREFERENCES = {
  theme: 'system',
  defaultModel: 'kimi-k2',
  defaultMode: 'chat',
  autoSave: true,
}
