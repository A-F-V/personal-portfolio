import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import Image from "next/image";

export type IconType = {
  lucide?: LucideIcon;
  imgSrc?: string;
  fontAwesome?: string;
  background?: string;
};

export const iconVariants = cva(["size-4"], {
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

const cls = "rounded-sm";
export function Icon({ variant, className, icon, size }: IconProps) {
  return (
    <>
      {icon.lucide || icon.fontAwesome ? (
        <div
          className={cn(
            iconVariants({ variant }),
            className,
            `h-[${size}px]`,
            cls
          )}
        >
          {icon.lucide && <icon.lucide className="w-full h-full" />}
          {icon.fontAwesome && (
            <i className={`fa-brands fa-${icon.fontAwesome}`} />
          )}
        </div>
      ) : (
        <Image
          src={icon.imgSrc}
          alt="Icon"
          className={cn(
            iconVariants({ variant }),
            className,
            `size-[${size}px]`,
            icon.background,
            cls
          )}
          width={size}
          height={size}
        />
      )}
    </>
  );
}

export const ObsidianIcon: IconType = {
  imgSrc: "/obsidian-icon.svg",
};

export const ReadwiseIcon: IconType = {
  imgSrc: "/readwise-icon.svg",
  background: "bg-foreground",
};

export const MacIcon: IconType = {
  imgSrc: "/mac-icon.png",
  background: "bg-foreground",
};

export const JanusIcon: IconType = {
  imgSrc: "/janus-icon.svg",
};

export const SubstackIcon: IconType = {
  imgSrc: "/substack.svg",
  background: "bg-foreground",
};

export const LinkedInIcon: IconType = {
  fontAwesome: "linkedin",
};

export const GithubIcon: IconType = {
  fontAwesome: "github",
};

export const BlueskyIcon: IconType = {
  fontAwesome: "bluesky",
};

export const RedditIcon: IconType = {
  fontAwesome: "reddit",
};

export const TwitterIcon: IconType = {
  fontAwesome: "twitter",
};
