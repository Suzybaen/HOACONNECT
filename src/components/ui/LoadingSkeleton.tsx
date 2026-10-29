import React from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse bg-muted rounded-md ${className}`} />;
}

export function KPICardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-card">
      <Skeleton className="h-4 w-24 mb-3" />
      <Skeleton className="h-8 w-32 mb-2" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function TableRowSkeleton({ cols = 6 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={`skel-col-${i}`} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

export function AnnouncementSkeleton() {
  return (
    <div className="p-4 border border-border rounded-lg">
      <Skeleton className="h-3 w-16 mb-2" />
      <Skeleton className="h-4 w-3/4 mb-1.5" />
      <Skeleton className="h-3 w-full mb-1" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}