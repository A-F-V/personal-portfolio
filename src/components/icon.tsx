import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import Image from "next/image";

export type IconType = {
  lucide?: LucideIcon;
  imgSrc?: string;
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
export function Icon({ variant, className, icon, size }: IconProps) {
  return (
    <>
      {icon.lucide && (
        <div
          className={cn(
            iconVariants({ variant }),
            className,
            `size-[${size}px]`
          )}
        >
          <icon.lucide className="w-full h-full" />
        </div>
      )}
      {icon.imgSrc && (
        <Image
          src={icon.imgSrc}
          alt="Icon"
          className={cn(
            iconVariants({ variant }),
            className,
            `size-[${size}px]`,
            icon.background
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
