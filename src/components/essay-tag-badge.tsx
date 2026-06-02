import { cn } from "@/lib/utils/shadcn";

interface EssayTagBadgeProps {
    tag: string;
    className?: string;
}

export function EssayTagBadge({ tag, className }: EssayTagBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex h-5 max-w-full items-center rounded-[4px] border px-1.5 font-mono text-[9px] font-medium uppercase leading-none tracking-[0.12em] transition-colors",
                "border-[color:color-mix(in_srgb,var(--foreground)_38%,transparent)] bg-[color:color-mix(in_srgb,var(--foreground)_8%,transparent)] text-[color:color-mix(in_srgb,var(--foreground)_70%,transparent)]",
                "hover:border-[color:color-mix(in_srgb,var(--foreground)_50%,transparent)] hover:bg-[color:color-mix(in_srgb,var(--foreground)_12%,transparent)] hover:text-[color:color-mix(in_srgb,var(--foreground)_85%,transparent)]",
                "group-hover:border-[color:color-mix(in_srgb,var(--foreground)_50%,transparent)] group-hover:bg-[color:color-mix(in_srgb,var(--foreground)_12%,transparent)] group-hover:text-[color:color-mix(in_srgb,var(--foreground)_85%,transparent)]",
                className
            )}
        >
            {tag}
        </span>
    );
}
