import Image from "next/image";
import { cn } from "@/lib/utils/shadcn";
import {
    GithubIcon,
    Icon,
    LinkedInIcon,
    SubstackIcon,
    TwitterIcon,
} from "@/components/icon";

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
];

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

export function BioIntro() {
    return (
        <div>
            <h1 className="text-8xl font-serif mb-6">Alessandro Farace</h1>
            <div className="flex flex-col gap-4">
                <p>
                    I&apos;m a <Highlight>software engineer</Highlight>{" "}
                    exploring how technology can transform{" "}
                    <Highlight>education and learning</Highlight>. Despite the
                    explosion of free online educational content, graduates have
                    not seen an improvement in intellectual or career outcomes.
                </p>
                <p>
                    And yet, educational researchers have strong evidence that
                    better methods and tools of instruction can nurture students
                    to the ability of today&apos;s top 5%.
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
    );
}
