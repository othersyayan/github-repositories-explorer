import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-5">
      <Skeleton className="h-6 w-[200px]" />

      <div className="space-y-4">
        <Skeleton className="h-[77px] w-full" />
        <Skeleton className="h-[77px] w-full" />
        <Skeleton className="h-[77px] w-full" />
        <Skeleton className="h-[77px] w-full" />
        <Skeleton className="h-[77px] w-full" />
      </div>
    </div>
  );
}
