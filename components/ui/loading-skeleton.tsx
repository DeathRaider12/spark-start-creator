import { cn } from "@/lib/utils"

interface SkeletonProps {
    className?: string
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted", className)}
        />
    )
}

export function LoadingState() {
    return (
        <div className="space-y-4 p-4">
            <Skeleton className="h-8 w-[250px]" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[80%]" />
            </div>
        </div>
    )
}