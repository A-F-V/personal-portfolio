import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Rss } from "lucide-react";

import { Icon, SubstackIcon, TwitterIcon } from "@/components/icon";
import { getAllEssays } from "@/lib/essays";
import { RSS_FEED_PATH } from "@/lib/site";
import { cn } from "@/lib/utils/shadcn";
import {
    getRecentEssayFooterPosts,
    type EssayFooterPost,
} from "./recent-posts";

export type { EssayFooterPost } from "./recent-posts";

interface FooterAction {
    href: string;
    label: string;
    description: string;
    icon: ReactNode;
    iconShellClassName?: string;
}

interface FollowAction {
    href: string;
    label: string;
    icon: ReactNode;
    actionClassName: string;
}

interface EssayFooterProps {
    currentSlug: string;
}

interface EssayFooterContentProps {
    recentPosts: EssayFooterPost[];
}

const followActions: FollowAction[] = [
    {
        href: "https://alessandrofv.substack.com/?ref=alessandrofv.com",
        label: "Substack",
        icon: <Icon icon={SubstackIcon} className="size-4" />,
        actionClassName:
            "bg-[#FF6719] text-white shadow-[#FF6719]/20 hover:bg-[#FF6719]/90 hover:shadow-[#FF6719]/25 focus-visible:ring-[#FF6719]/35",
    },
    {
        href: "https://x.com/AFV_7?ref=alessandrofv.com",
        label: "Twitter",
        icon: <Icon icon={TwitterIcon} className="size-4" />,
        actionClassName:
            "bg-[#1D9BF0] text-white shadow-[#1D9BF0]/20 hover:bg-[#1D9BF0]/90 hover:shadow-[#1D9BF0]/25 focus-visible:ring-[#1D9BF0]/35",
    },
    {
        href: RSS_FEED_PATH,
        label: "RSS",
        icon: <Rss className="size-4" aria-hidden />,
        actionClassName:
            "bg-primary text-primary-foreground shadow-primary/15 hover:bg-primary/90 hover:shadow-primary/20 focus-visible:ring-primary/25",
    },
];

const projectActions: FooterAction[] = [
    {
        href: "https://janus.cards",
        label: "Janus",
        description: "AI Flashcards",
        icon: (
            <Image
                src="/janus-no-background.svg"
                alt=""
                width={32}
                height={32}
                className="size-full object-contain"
            />
        ),
        iconShellClassName: "border-primary/15 bg-[#23395B]",
    },
    {
        href: "https://github.com/franklin-md/franklin-mono",
        label: "Franklin",
        description: "Agents in Obsidian",
        icon: (
            <Image
                src="/franklin-kite.png"
                alt=""
                width={32}
                height={32}
                className="size-full object-cover"
            />
        ),
        iconShellClassName: "overflow-hidden border-primary/10 bg-background",
    },
];

function formatPostDate(date: Date): string {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
    })
        .format(date)
        .toUpperCase();
}

function isExternalHref(href: string): boolean {
    return /^https?:\/\//.test(href);
}

function FooterColumn({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="min-w-0">
            <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/45">
                {title}
            </h2>
            {children}
        </section>
    );
}

function FooterActionLink({ action }: { action: FooterAction }) {
    const external = isExternalHref(action.href);

    return (
        <Link
            href={action.href}
            className={cn(
                "group flex min-w-0 items-center gap-3 rounded-md px-2.5 py-2",
                "text-foreground/80 transition-colors hover:bg-primary/5 hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
            )}
            {...(external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
            prefetch={false}
        >
            <span
                className={cn(
                    "flex size-8 shrink-0 items-center justify-center overflow-hidden border border-foreground/10 bg-background text-primary",
                    action.iconShellClassName
                )}
            >
                {action.icon}
            </span>
            <span className="min-w-0">
                <span className="flex items-center gap-1 text-[13px] font-semibold leading-none">
                    {action.label}
                    {external ? (
                        <ArrowUpRight
                            className="size-3 text-foreground/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden
                        />
                    ) : null}
                </span>
                <span className="mt-1 block truncate text-[11px] leading-tight text-foreground/45">
                    {action.description}
                </span>
            </span>
        </Link>
    );
}

function FollowActionLink({ action }: { action: FollowAction }) {
    const external = isExternalHref(action.href);

    return (
        <Link
            href={action.href}
            {...(external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
            className={cn(
                "group flex min-h-10 w-full min-w-0 items-center justify-center gap-2.5 rounded-md px-3 py-2",
                "text-[12px] font-bold uppercase leading-none tracking-[0.16em] shadow-md",
                "transition-all hover:-translate-y-0.5 hover:shadow-lg",
                "focus-visible:outline-none focus-visible:ring-2 active:translate-y-0",
                action.actionClassName
            )}
            prefetch={false}
        >
            <span className="shrink-0">{action.icon}</span>
            <span className="truncate">{action.label}</span>
        </Link>
    );
}

function RecentPostLink({ post }: { post: EssayFooterPost }) {
    return (
        <Link
            href={post.href}
            className={cn(
                "group block rounded-md px-2.5 py-2 transition-colors hover:bg-primary/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
            )}
            prefetch={false}
        >
            <span className="block truncate text-[13px] font-semibold leading-tight text-foreground/80 group-hover:text-foreground">
                {post.title}
            </span>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/40">
                {formatPostDate(post.publishDate)}
            </span>
        </Link>
    );
}

export function EssayFooterContent({ recentPosts }: EssayFooterContentProps) {
    return (
        <footer className="mt-8 border-t border-foreground/10 pt-6 md:-mx-4 lg:-mx-16">
            <div className="rounded-lg border border-foreground/10 bg-card/85 p-4 shadow-[0_22px_55px_rgba(14,27,61,0.14)]">
                <div className="grid gap-5 md:grid-cols-[minmax(0,1.65fr)_minmax(0,0.9fr)_minmax(0,0.9fr)]">
                    <FooterColumn title="Recent Posts">
                        <div className="space-y-1">
                            {recentPosts.map((post) => (
                                <RecentPostLink key={post.href} post={post} />
                            ))}
                        </div>
                    </FooterColumn>

                    <FooterColumn title="Follow">
                        <div className="space-y-2">
                            {followActions.map((action) => (
                                <FollowActionLink
                                    key={action.href}
                                    action={action}
                                />
                            ))}
                        </div>
                    </FooterColumn>

                    <FooterColumn title="Projects">
                        <div className="space-y-1">
                            {projectActions.map((action) => (
                                <FooterActionLink
                                    key={action.href}
                                    action={action}
                                />
                            ))}
                        </div>
                    </FooterColumn>
                </div>
            </div>
        </footer>
    );
}

export async function EssayFooter({ currentSlug }: EssayFooterProps) {
    const essays = await getAllEssays();
    const recentPosts = getRecentEssayFooterPosts(essays, currentSlug);

    return <EssayFooterContent recentPosts={recentPosts} />;
}
