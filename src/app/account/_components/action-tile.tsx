import * as React from 'react';
import { Card } from '@/components/ui/card';

type ActionTileProps = {
  icon: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  rightSlot?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function ActionTile({
  icon,
  title,
  subtitle,
  rightSlot,
  onClick,
  className,
}: ActionTileProps) {
  const aria =
    typeof title === 'string'
      ? title
      : typeof subtitle === 'string'
        ? subtitle
        : 'Action';

  return (
    <button
      onClick={onClick}
      className={`group text-left ${className ?? ''}`}
      type="button"
      aria-label={aria}
    >
      <Card className="h-[165px] w-full rounded-2xl border border-white/25 bg-white/5 backdrop-blur-md transition hover:bg-white/7">
        <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="text-orange-500">{icon}</div>

          <div className="space-y-1">
            <div className="text-base font-semibold text-white">{title}</div>
            {subtitle && (
              <div className="text-sm font-semibold text-orange-400">{subtitle}</div>
            )}
          </div>


        </div>
      </Card>
    </button>
  );
}
