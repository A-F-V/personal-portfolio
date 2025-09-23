import Image from "next/image";

import { cn } from "@/lib/utils/shadcn";

interface EssayHeroImageProps {
    src: string;
    alt: string;
    priority?: boolean;
    className?: string;
}

export function EssayHeroImage({
    src,
    alt,
    priority = false,
    className,
}: EssayHeroImageProps) {
    return (
        <div
            className={cn(
                "relative w-full overflow-hidden rounded-xl",
                "aspect-[16/9] bg-foreground/5",
                className
            )}
        >
            <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
            />
        </div>
    );
}
