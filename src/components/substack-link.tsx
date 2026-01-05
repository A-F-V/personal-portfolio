import { SubstackIcon, Icon } from "./icon";
import { cn } from "@/lib/utils/shadcn";

interface SubstackLinkProps {
    url: string;
    variant?: "read" | "subscribe";
    className?: string;
}

export function SubstackLink({ url, variant = "read", className }: SubstackLinkProps) {
    if (variant === "subscribe") {
        return (
            <div className={cn("flex items-center justify-center py-4 border-t border-foreground/5", className)}>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-[#FF6719] px-8 py-4 text-lg font-bold uppercase tracking-[0.2em] text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-[#FF6719]/90 active:scale-[0.98]"
                >
                    <Icon icon={SubstackIcon} className="size-6" />
                    Subscribe
                </a>
            </div>
        );
    }

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "flex items-center gap-2 rounded-full border border-[#FF6719]/20 bg-[#FF6719]/10 px-2.5 py-1 text-xs font-bold uppercase tracking-tight text-[#FF6719] hover:bg-[#FF6719]/20 transition-colors",
                className
            )}
        >
            <Icon icon={SubstackIcon} className="size-3" />
            Read on Substack
        </a>
    );
}
