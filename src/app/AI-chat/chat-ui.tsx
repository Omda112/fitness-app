/**
 * Chat Component
 * 
 * This is the main chat interface for the AI Fitness App.
 * 
 * Features:
 * - Persistent chat history using localStorage (via useChatPersistence hook)
 * - Smart thread titling: Automatically renames "New Chat" based on the first message context
 * - Multi-model support (Gemini, Llama, DeepSeek, etc.)
 * - Professional Dark Mode with glassmorphism effects
 * - Responsive Sidebar: Collapsible on desktop, drawer-style on mobile
 * 
 * Architecture:
 * - Chat Persistence: Managed by `useChatPersistence` hook and `messageStorage` utility.
 * - Runtime: Uses `@assistant-ui/react`'s `useLocalRuntime` with a custom `ThreadHistoryAdapter`.
 * - Model Adapter: Connects to OpenRouter via `createOpenRouterAdapter`.
 */

import { Thread } from '@/components/assistant-ui/thread';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  useChatPersistence,
  messageStorage,
  extractTitleFromMessage,
} from '@/app/AI-chat/_hooks/useChatPersistence';
import {
  createOpenRouterAdapter,
  generateChatTitle,
} from '@/lib/apis/AI/Ai.action';
import { cn } from '@/lib/utils';
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  type ThreadHistoryAdapter,
  type ThreadMessage,
  type ExportedMessageRepository,
} from '@assistant-ui/react';
import { ChevronDown, Cpu, Menu, MessageSquare, Sparkles, X } from 'lucide-react';
import { useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// Configuration: Available AI Models
const AVAILABLE_MODELS = [
  { id: 'google/gemini-2.0-flash-001', i18nKey: 'aiChat.header.models.gemini' },
  { id: 'meta-llama/llama-3.3-70b-instruct:free', i18nKey: 'aiChat.header.models.llama' },
  { id: 'nex-agi/deepseek-v3.1-nex-n1:free', i18nKey: 'aiChat.header.models.deepseek' },
  { id: 'google/gemma-3n-e4b-it:free', i18nKey: 'aiChat.header.models.gemma' },
];

/**
 * ChatRuntimeWrapper
 * 
 * A wrapper component that bridges the persistent storage with the Assistant UI runtime.
 * It handles loading messages from storage and appending new messages.
 * Crucially, it triggers the "Smart Title Generation" on the first user message.
 */
interface ChatRuntimeProps {
  threadId: string;
  selectedModel: string;
  isPendingThread: boolean;
  onFirstMessage: (title: string) => void;
  onThreadTitleUpdate: (threadId: string, title: string) => void;
}

function ChatRuntimeWrapper({
  threadId,
  selectedModel,
  isPendingThread,
  onFirstMessage,
  onThreadTitleUpdate,
}: ChatRuntimeProps) {
  const { t } = useTranslation();
  
  // Custom History Adapter: Connects runtime actions to our localStorage persistence
  const historyAdapter: ThreadHistoryAdapter = useMemo(
    () => ({
      // Load messages for the current thread from localStorage
      load: async (): Promise<ExportedMessageRepository> => {
        const storedMessages = messageStorage.get(threadId);
        return { messages: storedMessages };
      },
      
      // Save new messages to localStorage and handle Title Generation
      append: async (data: { parentId: string | null; message: ThreadMessage }) => {
        const storedMessages = messageStorage.append(
          threadId,
          data.message,
          data.parentId
        );

        // Check if this is the FIRST user message to trigger renaming
        const isFirstUserMessage = 
          storedMessages.length === 1 && 
          data.message.role === 'user';

        if (isFirstUserMessage) {
          let title = t('aiChat.thread.newChat');
          try {
            // Extract text content for the AI title generator
            const content = Array.isArray(data.message.content) 
              ? data.message.content.find((c) => c.type === 'text')?.text 
              : null;
              
            if (content) {
              // Generate smart title via AI
              const generatedTitle = await generateChatTitle(content, selectedModel);
              title = generatedTitle;
            } else {
               // Fallback to simple extraction
               title = extractTitleFromMessage(data.message) || t('aiChat.thread.newChat');
            }
          } catch (e) {
            console.error('Failed to generate title', e);
            title = extractTitleFromMessage(data.message) || t('aiChat.thread.newChat');
          }

          // Update the thread title in our persistence layer
          if (isPendingThread) {
            onFirstMessage(title); // Create real thread from pending
          } else {
            onThreadTitleUpdate(threadId, title); // Rename existing
          }
        }
      },
    }),
    [threadId, isPendingThread, onFirstMessage, onThreadTitleUpdate, selectedModel, t]
  );

  const adapter = useMemo(() => createOpenRouterAdapter(selectedModel), [selectedModel]);

  // Initialize Local Runtime with our custom adapters
  const runtime = useLocalRuntime(adapter, {
    adapters: {
      history: historyAdapter,
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex-1 overflow-hidden">
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
}

/**
 * Main Chat Component
 */
export default function Chat() {
  const { t } = useTranslation();
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Hook: Manages persistence, thread lists, and active thread state
  const {
    threadId,
    activeThreads,
    isPendingThread,
    createThread,
    switchThread,
    updateThreadTitle,
    archiveThread,
    persistPendingThread,
  } = useChatPersistence();

  // Callback: Persist a pending thread once the first message is sent
  const handleFirstMessage = useCallback(
    (title: string) => {
      persistPendingThread(title);
    },
    [persistPendingThread]
  );

  // Callback: Update existing thread title
  const handleThreadTitleUpdate = useCallback(
    (tid: string, title: string) => {
      updateThreadTitle(tid, title);
    },
    [updateThreadTitle]
  );

  return (
    <TooltipProvider>
      <div className="relative flex h-screen w-full overflow-hidden bg-[#f8f9fa] dark:bg-zinc-950">
        
        {/* Sidebar Section  */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 dark:backdrop-blur-xl transition-all duration-300 ease-in-out',
            // Mobile: Slide-in drawer
            'md:static md:translate-x-0', 
            isSidebarOpen
              ? 'translate-x-0 md:w-72' // Open state
              : '-translate-x-full md:pointer-events-none md:w-0 md:opacity-0' // Closed state
          )}
        >
          {/* Sidebar Header */}
          <div className="flex h-14 items-center justify-between border-b border-gray-200 dark:border-zinc-800 px-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <span className="text-sm font-semibold">{t('aiChat.sidebar.title')}</span>
            </div>
            {/* Close Button (visible on mobile/desktop when open) */}
            <Button
              variant="ghost"
              size="icon"
              className="size-8 cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* "New Thread" Button - Pinned to top */}
            <div className="p-3 pb-0">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 rounded-lg border-gray-200 dark:border-zinc-800 dark:bg-zinc-900/50 px-3 text-sm shadow-none hover:bg-muted dark:hover:bg-zinc-800 cursor-pointer"
                onClick={createThread}
              >
                <Sparkles className="size-4" />
                {t('aiChat.sidebar.newThread')}
              </Button>
            </div>

            {/* Scrollable Thread List */}
            <div className="flex-1 overflow-y-auto p-3 pt-2">
              <div className="flex flex-col gap-1">
                {activeThreads.map((thread) => (
                  <div
                    key={thread.id}
                    className={cn(
                      'group flex h-9 cursor-pointer items-center rounded-lg transition-colors hover:bg-muted dark:hover:bg-zinc-800/50',
                      thread.id === threadId && 'bg-muted dark:bg-zinc-800' // Highlight active thread
                    )}
                  >
                    {/* Thread Title Button */}
                    <button
                      className="flex h-full flex-1 items-center truncate px-3 text-start text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 cursor-pointer"
                      onClick={() => {
                        switchThread(thread.id);
                      }}
                    >
                      {thread.title}
                    </button>
                    
                    {/* Archive/Delete Action */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2 size-7 p-0 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-background/80 dark:hover:bg-zinc-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        archiveThread(thread.id);
                      }}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="border-t border-gray-200 dark:border-zinc-800 p-3">
            <div className="rounded-lg bg-gray-50 dark:bg-zinc-800/50 p-3 text-center text-xs text-gray-600 dark:text-zinc-400">
              <MessageSquare className="mx-auto mb-1 size-4" />
              <p>{t('aiChat.sidebar.storageNotice')}</p>
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex flex-1 flex-col overflow-hidden bg-white dark:bg-zinc-900">
          
          {/* Main Header */}
          <header className="flex h-14 items-center justify-between border-b border-gray-200 dark:border-zinc-800 px-4">
            <div className="flex items-center gap-3">
              {/* Sidebar Toggle Button */}
              <Button
                variant="ghost"
                size="icon"
                className="size-9 cursor-pointer"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className={cn('size-5', isSidebarOpen ? 'hidden' : '')} />
              </Button>

              {/* Model Selector Dropdown */}
              <div className="group relative">
                <div className="flex cursor-pointer items-center gap-2 rounded-md p-1 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                  <div className="flex size-8 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 shadow-sm">
                    <Sparkles className="size-4 text-white" />
                  </div>
                  <div>
                    <h1 className="flex items-center gap-1 text-sm font-semibold">
                      {t(AVAILABLE_MODELS.find((m) => m.id === selectedModel)?.i18nKey || 'aiChat.header.models.gemini')}
                      <ChevronDown className="size-3 text-gray-400 dark:text-zinc-500" />
                    </h1>
                    <p className="text-[10px] font-medium uppercase tracking-tight text-gray-500 dark:text-zinc-500">
                      {t('aiChat.header.activeModel')}
                    </p>
                  </div>
                </div>

                {/* Dropdown Menu Items */}
                <div className="pointer-events-none absolute start-0 top-full z-50 mt-1 w-56 overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 opacity-0 shadow-lg transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="p-2 text-[10px] font-bold uppercase text-gray-400 dark:text-zinc-500">
                    {t('aiChat.header.switchModel')}
                  </div>
                  {AVAILABLE_MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className={cn(
                        'flex w-full items-center gap-2 px-3 py-2 text-start text-sm transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800/50',
                        selectedModel === model.id
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'text-gray-700 dark:text-zinc-300'
                      )}
                    >
                      <Cpu className="size-4" />
                      {t(model.i18nKey)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* Chat Runtime Wrapper */}
          {/* We key this by threadId to force a full re-mount when switching threads,
              ensuring the runtime is always fresh for the selected chat. */}
          <ChatRuntimeWrapper
            key={threadId}
            threadId={threadId}
            selectedModel={selectedModel}
            isPendingThread={isPendingThread}
            onFirstMessage={handleFirstMessage}
            onThreadTitleUpdate={handleThreadTitleUpdate}
          />
        </main>
      </div>
    </TooltipProvider>
  );
}
