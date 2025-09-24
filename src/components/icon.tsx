import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils/shadcn";
import Image from "next/image";
import { LuGithub } from "react-icons/lu";
import { FaLinkedin } from "react-icons/fa6";
import { FaBluesky } from "react-icons/fa6";
import { FaReddit } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";

export type IconType = {
    img?: LucideIcon | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    imgSrc?: string;
    fontAwesome?: string;
    className?: string;
};

export const iconVariants = cva(["size-6"], {
    variants: {
        variant: {
            default: "",
        },
    },
});
type IconProps = VariantProps<typeof iconVariants> & {
    className?: string;
    size?: number;
    icon: IconType;
};

export function Icon({ variant, className, icon }: IconProps) {
    const baseClasses = cn(
        "flex items-center justify-center rounded-sm overflow-hidden",
        iconVariants({ variant }),
        className
    );

    return (
        <>
            {icon.img ? (
                <div className={baseClasses}>
                    {icon.img && <icon.img className="w-full h-full" />}
                </div>
            ) : (
                icon.imgSrc && (
                    <div className={baseClasses}>
                        <Image
                            src={icon.imgSrc}
                            alt="Icon"
                            className={cn(
                                "w-full h-full object-contain",
                                icon.className
                            )}
                            width={32}
                            height={32}
                        />
                    </div>
                )
            )}
        </>
    );
}

export const ObsidianIcon: IconType = {
    imgSrc: "/obsidian-icon.svg",
};

export const ReadwiseIcon: IconType = {
    imgSrc: "/readwise-icon.svg",
};

export const MacIcon: IconType = {
    imgSrc: "/mac-icon.png",
};

export const JanusIcon: IconType = {
    imgSrc: "/janus-no-background.svg",
};

export const SubstackIcon: IconType = {
    imgSrc: "/substack.svg",
    className: "p-1 bg-foreground text-transparent",
};

export const LinkedInIcon: IconType = {
    img: FaLinkedin,
};

export const GithubIcon: IconType = {
    img: LuGithub,
};

export const BlueskyIcon: IconType = {
    img: FaBluesky,
};

export const RedditIcon: IconType = {
    img: FaReddit,
};

export const TwitterIcon: IconType = {
    img: FaTwitter,
};
