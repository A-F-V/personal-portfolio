import Image from "next/image";
import { Rss } from "lucide-react";
import { cn } from "@/lib/utils/shadcn";
import { RSS_FEED_PATH } from "@/lib/site";
import {
    GithubIcon,
    Icon,
    LinkedInIcon,
    SubstackIcon,
    TwitterIcon,
} from "@/components/icon";

const socialLinks = [
    {
        href: RSS_FEED_PATH,
        icon: { img: Rss },
        label: "RSS",
    },
    {
        href: "https://www.linkedin.com/in/alessandro-farace-587959193/?ref=alessandrofv.com",
        icon: LinkedInIcon,
        label: "LinkedIn",
    },
    {
        href: "https://x.com/AFV_7?ref=alessandrofv.com",
        icon: TwitterIcon,
        label: "Twitter",
    },
    {
        href: "https://alessandrofv.substack.com/?ref=alessandrofv.com",
        icon: SubstackIcon,
        label: "Substack",
    },
    {
        href: "https://github.com/A-F-V?ref=alessandrofv.com",
        icon: GithubIcon,
        label: "GitHub",
    },
];

function SocialLinks({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "flex flex-wrap justify-center gap-6 text-2xl sm:text-3xl",
                className,
            )}
        >
            {socialLinks.map(({ href, icon, label }) => (
                <a
                    key={href}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon icon={icon} size={30} />
                </a>
            ))}
        </div>
    );
}

function Highlight({ children }: { children: React.ReactNode }) {
    return <span className="font-bold underline ">{children}</span>;
}

export function BioSidebar() {
    return (
        <div className="flex flex-col gap-10 items-center w-full min-w-0">
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden max-w-[300px]">
                <Image
                    src="/personal/alessandro.jpeg"
                    alt="Alessandro Farace"
                    fill
                    priority
                    className="object-cover object-top "
                />
            </div>

            <SocialLinks className="mx-auto" />
        </div>
    );
}

const drivingQuestions = [
    "Can we think deeply for more than four hours a day?",
    "Hold focus past the 90 minute wall?",
    "Remember what we read for years instead of weeks?",
    "Learn twice as fast?",
];

export function BioIntro() {
    return (
        <div>
            <h1 className="text-8xl font-serif mb-6">Alessandro Farace</h1>
            <div className="flex flex-col gap-4 text-xl font-light">
                <p>
                    I suppose the best way to know me professionally is
                    through the underlying question that led me to solo
                    bootstrap a flashcard generator for 2 years:
                </p>
                <p className="font-serif text-3xl font-normal py-2">
                    What is the limit of human potential?
                </p>
                <ul className="flex flex-col gap-1 list-none">
                    {drivingQuestions.map((question) => (
                        <li key={question} className="italic">
                            {question}
                        </li>
                    ))}
                </ul>
                <p>
                    If our potential were predetermined, by talents arbitrarily
                    endowed to us at birth, that would be a bleak world. I
                    don&apos;t believe it is the case. I think{" "}
                    <Highlight>
                        better systems of thought and personal development
                    </Highlight>{" "}
                    exist.
                </p>
                <p>
                    Helping myself and others{" "}
                    <Highlight>raise that ceiling</Highlight> is one of the
                    deepest sources of meaning in my life. Everything below is
                    in service of that.
                </p>
            </div>
        </div>
    );
}
