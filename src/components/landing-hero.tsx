"use client";

import Image from "next/image";
import {
    GithubIcon,
    Icon,
    JanusIcon,
    LinkedInIcon,
    ObsidianIcon,
    SubstackIcon,
    TwitterIcon,
} from "@/components/icon";
import { cn } from "@/lib/utils/shadcn";
import type { EssayFrontMatter } from "@/lib/essays/types";
import { MinorHeading } from "./headings";
import { IconType } from "./icon";
import { ProjectCard } from "./project-card";
import { EssayLink } from "./essay-link";

import { FaCodeCommit } from "react-icons/fa6";

const socialLinks = [
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
    // {
    //     href: "https://www.reddit.com/user/AFV_7/?ref=alessandrofv.com",
    //     icon: RedditIcon,
    //     label: "Reddit",
    // },
];

const featuredProjects = [
    {
        title: "Janus",
        keywords: ["flashcards", "spaced repetition"],
        description:
            "Transform your documents, videos, notes and highlights into flashcards for Anki and Mochi",
        href: "https://janus.cards",
        icon: <Icon icon={JanusIcon} className="size-16" />,
    },
    {
        title: "Arcana",
        keywords: ["ai", "note-taking"],
        description:
            "An all-in-one AI plugin for Obsidian, including chat, text-completion, tagging, note mover, and renamer.",
        href: "https://github.com/A-F-V/obsidian-arcana",
        icon: <Icon icon={ObsidianIcon} className="size-16" />,
    },
];

interface LandingHeroProps {
    essays: EssayFrontMatter[];
}

function SocialLinks({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "flex flex-wrap justify-center gap-6 text-2xl sm:text-3xl",
                className
            )}
        >
            {socialLinks.map(({ href, icon }) => (
                <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon icon={icon} size={30} />
                </a>
            ))}
        </div>
    );
}

const headingIcon: IconType = {
    img: FaCodeCommit,
};

function Highlight({ children }: { children: React.ReactNode }) {
    return <span className="font-bold underline ">{children}</span>;
}

export function LandingHero({ essays }: LandingHeroProps) {
    return (
        <div className="max-w-full lg:max-w-7xl w-full flex justify-center">
            <div className="grid gap-4 lg:gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] items-start">
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

                <div className="flex flex-col gap-8 max-w-[60ch] w-full min-w-0 px-2">
                    <div>
                        <h1 className="text-8xl font-serif mb-6">
                            Alessandro Farace
                        </h1>
                        <div className="flex flex-col gap-4">
                            <p>
                                I&apos;m a{" "}
                                <Highlight>software engineer</Highlight>{" "}
                                exploring how technology can transform{" "}
                                <Highlight>education and learning</Highlight>.
                                Despite the explosion of free online educational
                                content, graduates have not seen an improvement
                                in intellectual or career outcomes.
                            </p>
                            <p>
                                And yet, educational researchers have strong
                                evidence that better methods and tools of
                                instruction can nurture students to the ability
                                of today&apos;s top 5%.
                            </p>
                            <p>
                                This opportunity to{" "}
                                <Highlight>
                                    radically realize students&apos; potential
                                </Highlight>{" "}
                                is what inspires me and my work.
                            </p>
                        </div>
                    </div>
                    <div>
                        <MinorHeading icon={headingIcon}>Projects</MinorHeading>
                        <div className="flex flex-col gap-6">
                            {featuredProjects.map((project) => (
                                <ProjectCard
                                    key={project.title}
                                    title={project.title}
                                    keywords={project.keywords}
                                    description={project.description}
                                    href={project.href}
                                    icon={project.icon}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <MinorHeading icon={headingIcon}>Essays</MinorHeading>

                        <div className="flex flex-col gap-3">
                            {essays
                                .sort(
                                    (a, b) =>
                                        b.publishDate.getTime() -
                                        a.publishDate.getTime()
                                )
                                .map((essay) => (
                                    <EssayLink
                                        key={`${essay.slug}-${essay.publishDate}`}
                                        title={essay.title}
                                        subtitle={essay.subtitle}
                                        link={`/essay/${essay.slug}`}
                                        datePublished={essay.publishDate}
                                        readingTime={essay.readingTime}
                                        tags={essay.tags}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
