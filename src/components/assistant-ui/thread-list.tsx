import { TooltipIconButton } from '@/components/assistant-ui/tooltip-icon-button';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AssistantIf,
  ThreadListItemPrimitive,
  ThreadListPrimitive,
} from '@assistant-ui/react';
import { ArchiveIcon, PlusIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const ThreadList: FC = () => {
  return (
    <ThreadListPrimitive.Root className="aui-root aui-thread-list-root flex flex-col gap-1">
      <ThreadListNew />
      <AssistantIf condition={({ threads }) => threads.isLoading}>
        <ThreadListSkeleton />
      </AssistantIf>
      <AssistantIf condition={({ threads }) => !threads.isLoading}>
        <ThreadListPrimitive.Items components={{ ThreadListItem }} />
      </AssistantIf>
    </ThreadListPrimitive.Root>
  );
};

const ThreadListNew: FC = () => {
  const { t } = useTranslation();
  return (
    <ThreadListPrimitive.New asChild>
      <Button
        variant="outline"
        className="aui-thread-list-new cursor-pointer shadow-none h-9 border-gray-200 dark:border-zinc-800 dark:bg-zinc-900/50 justify-start gap-2 rounded-lg px-3 text-sm hover:bg-muted dark:hover:bg-zinc-800 data-active:bg-muted"
      >
        <PlusIcon className="size-4" />
        {t('aiChat.thread.threadList.newThread')}
      </Button>
    </ThreadListPrimitive.New>
  );
};

const ThreadListSkeleton: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          role="status"
          aria-label={t('aiChat.thread.threadList.loading')}
          className="aui-thread-list-skeleton-wrapper flex h-9 items-center px-3"
        >
          <Skeleton className="aui-thread-list-skeleton h-4 w-full" />
        </div>
      ))}
    </div>
  );
};

const ThreadListItem: FC = () => {
  const { t } = useTranslation();
  return (
    <ThreadListItemPrimitive.Root className=" aui-thread-list-item group flex h-9 items-center rounded-lg transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none data-active:bg-muted">
      <ThreadListItemPrimitive.Trigger className="cursor-pointer aui-thread-list-item-trigger flex h-full flex-1 items-center truncate px-3 text-start text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
        <ThreadListItemPrimitive.Title fallback={t('aiChat.thread.threadList.fallbackTitle')} />
      </ThreadListItemPrimitive.Trigger>
      <ThreadListItemArchive />
    </ThreadListItemPrimitive.Root>
  );
};

const ThreadListItemArchive: FC = () => {
  const { t } = useTranslation();
  return (
    <ThreadListItemPrimitive.Archive asChild>
      <TooltipIconButton
        variant="ghost"
        tooltip={t('aiChat.thread.threadList.archive')}
        className="aui-thread-list-item-archive cursor-pointer mr-2 size-7 p-0 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <ArchiveIcon className="size-4" />
      </TooltipIconButton>
    </ThreadListItemPrimitive.Archive>
  );
};
