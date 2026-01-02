import { useState, useCallback, useMemo } from 'react';
import type { ThreadMessage } from '@assistant-ui/react';

// ============ Storage Keys ============
const STORAGE_KEYS = {
  THREADS: 'ai-chat-threads',
  MESSAGES_PREFIX: 'ai-chat-messages-',
  CURRENT_THREAD: 'ai-chat-current-thread',
} as const;

// ============ Types ============
export type StoredThread = {
  id: string;
  title: string;
  createdAt: string;
  isArchived: boolean;
};

export type StoredMessage = {
  message: ThreadMessage;
  parentId: string | null;
};

// ============ localStorage Helpers ============
const storage = {
  get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  },

  getString(key: string): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  },

  setString(key: string, value: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
};

// ============ Thread Storage Functions ============
export const threadStorage = {
  getAll(): StoredThread[] {
    return storage.get<StoredThread[]>(STORAGE_KEYS.THREADS, []);
  },

  save(threads: StoredThread[]): void {
    storage.set(STORAGE_KEYS.THREADS, threads);
  },

  getCurrentId(): string | null {
    return storage.getString(STORAGE_KEYS.CURRENT_THREAD);
  },

  setCurrentId(threadId: string): void {
    storage.setString(STORAGE_KEYS.CURRENT_THREAD, threadId);
  },

  exists(threadId: string): boolean {
    return threadStorage.getAll().some((t) => t.id === threadId);
  },

  add(thread: StoredThread): StoredThread[] {
    const threads = threadStorage.getAll();
    const updatedThreads = [thread, ...threads];
    threadStorage.save(updatedThreads);
    return updatedThreads;
  },
};

// ============ Message Storage Functions ============
export const messageStorage = {
  get(threadId: string): StoredMessage[] {
    return storage.get<StoredMessage[]>(
      STORAGE_KEYS.MESSAGES_PREFIX + threadId,
      []
    );
  },

  save(threadId: string, messages: StoredMessage[]): void {
    storage.set(STORAGE_KEYS.MESSAGES_PREFIX + threadId, messages);
  },

  delete(threadId: string): void {
    storage.remove(STORAGE_KEYS.MESSAGES_PREFIX + threadId);
  },

  append(
    threadId: string,
    message: ThreadMessage,
    parentId: string | null
  ): StoredMessage[] {
    const messages = messageStorage.get(threadId);
    messages.push({ message, parentId });
    messageStorage.save(threadId, messages);
    return messages;
  },
};

// ============ Utility Functions ============
export const generateThreadId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const extractTitleFromMessage = (message: ThreadMessage): string | null => {
  const content = message.content;
  if (Array.isArray(content) && content.length > 0) {
    const textPart = content.find((p: any) => p.type === 'text');
    if (textPart && 'text' in textPart) {
      const text = (textPart as any).text;
      return text.slice(0, 50) + (text.length > 50 ? '...' : '');
    }
  }
  return null;
};

// ============ Custom Hook ============
export function useChatPersistence() {
  // Track whether the current thread is "pending" (not yet saved to storage)
  const [isPendingThread, setIsPendingThread] = useState<boolean>(false);

  // Initialize thread ID with existing or new pending thread
  const [threadId, setThreadId] = useState<string>(() => {
    if (typeof window === 'undefined') return generateThreadId();

    const threads = threadStorage.getAll();
    const currentId = threadStorage.getCurrentId();

    // Return current thread if it exists in storage
    if (currentId && threads.find((t) => t.id === currentId)) {
      return currentId;
    }

    // If there are existing threads, use the first active one
    if (threads.length > 0) {
      const firstThread = threads.find((t) => !t.isArchived) || threads[0];
      threadStorage.setCurrentId(firstThread.id);
      return firstThread.id;
    }

    // No threads exist - create a pending thread (not saved yet)
    const newId = generateThreadId();
    threadStorage.setCurrentId(newId);
    return newId;
  });

  // Check if initial thread is pending (not in storage)
  useState(() => {
    if (typeof window !== 'undefined') {
      const exists = threadStorage.exists(threadId);
      if (!exists) {
        setIsPendingThread(true);
      }
    }
  });

  const [threads, setThreads] = useState<StoredThread[]>(() =>
    threadStorage.getAll()
  );

  // Active (non-archived) threads
  const activeThreads = useMemo(
    () => threads.filter((t) => !t.isArchived),
    [threads]
  );

  // Persist a pending thread (called when first message is sent)
  const persistPendingThread = useCallback(
    (title: string = 'New Chat') => {
      if (!isPendingThread) return;

      const newThread: StoredThread = {
        id: threadId,
        title,
        createdAt: new Date().toISOString(),
        isArchived: false,
      };

      const updatedThreads = threadStorage.add(newThread);
      setThreads(updatedThreads);
      setIsPendingThread(false);
    },
    [threadId, isPendingThread]
  );

  // Create a new thread (pending - only ID, not saved to storage yet)
  const createThread = useCallback(() => {
    const newId = generateThreadId();
    threadStorage.setCurrentId(newId);
    setThreadId(newId);
    setIsPendingThread(true);
    // Note: NOT adding to threads state yet - will be added on first message
  }, []);

  // Switch to a different thread
  const switchThread = useCallback((id: string) => {
    threadStorage.setCurrentId(id);
    setThreadId(id);
    setIsPendingThread(false); // Switching to an existing thread
  }, []);

  // Update thread title
  const updateThreadTitle = useCallback((id: string, title: string) => {
    const updatedThreads = threadStorage.getAll().map((t) =>
      t.id === id ? { ...t, title } : t
    );
    threadStorage.save(updatedThreads);
    setThreads(updatedThreads);
  }, []);

  // Archive a thread
  const archiveThread = useCallback(
    (id: string) => {
      const updatedThreads = threadStorage.getAll().map((t) =>
        t.id === id ? { ...t, isArchived: true } : t
      );
      threadStorage.save(updatedThreads);
      setThreads(updatedThreads);

      // If we archived the current thread, switch to another or create pending
      if (id === threadId) {
        const activeThread = updatedThreads.find((t) => !t.isArchived);
        if (activeThread) {
          switchThread(activeThread.id);
        } else {
          createThread();
        }
      }
    },
    [threadId, switchThread, createThread]
  );

  // Delete a thread completely
  const deleteThread = useCallback(
    (id: string) => {
      const updatedThreads = threadStorage.getAll().filter((t) => t.id !== id);
      threadStorage.save(updatedThreads);
      messageStorage.delete(id);
      setThreads(updatedThreads);

      // If we deleted the current thread, switch to another or create pending
      if (id === threadId) {
        const activeThread = updatedThreads.find((t) => !t.isArchived);
        if (activeThread) {
          switchThread(activeThread.id);
        } else {
          createThread();
        }
      }
    },
    [threadId, switchThread, createThread]
  );

  return {
    // Current thread state
    threadId,
    threads,
    activeThreads,
    isPendingThread,

    // Thread actions
    createThread,
    switchThread,
    updateThreadTitle,
    archiveThread,
    deleteThread,
    persistPendingThread,
  };
}

export default useChatPersistence;
