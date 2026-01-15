import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type SelectPillProps = {
  title: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
};

export function SelectPill({ title, value, options, onChange }: SelectPillProps) {
  return (
    <div className="text-center">
      <h3 className="text-3xl font-extrabold text-white">{title}</h3>
      <div className="mt-1 text-base uppercase underline">Tap to change</div>

      <div className="mt-5 flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className=" h-12 justify-between w-[240px] gap-2 rounded-[20px] border">
              <span className="font-semibold">{value}</span>
              <RefreshCw className="h-5 w-5 opacity-90" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[260px]">
            {options.map((opt) => (
              <DropdownMenuItem key={opt} onClick={() => onChange(opt)}>
                {opt}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
