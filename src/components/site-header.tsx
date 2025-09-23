import type { ReactNode } from "react";

import Link from "next/link";

import { Button } from "@/components/button";
import { cn } from "@/lib/utils/shadcn";

interface SiteHeaderProps {
    title?: ReactNode;
    className?: string;
    containerClassName?: string;
    homeHref?: string;
    homeLabel?: string;
}

export function SiteHeader({
    className,
    containerClassName,
    homeHref = "/",
    homeLabel = "Alessandro Farace",
}: SiteHeaderProps) {
    return (
        <header className={cn("w-full", className)}>
            <div
                className={cn(
                    "mx-auto flex w-full items-center justify-between px-6 py-4",
                    "max-w-3xl",
                    containerClassName
                )}
            >
                <div className=""></div>
                <Button
                    asChild
                    variant="ghost"
                    className="text-2xl font-serif text-foreground/60 px-4 hover:underline "
                >
                    <Link href={homeHref}>{homeLabel}</Link>
                </Button>
            </div>
        </header>
    );
}
