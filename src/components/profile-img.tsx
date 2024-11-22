import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export function ProfileImage({
  src,
  alt,
  size = 128,
  className,
}: ProfileImageProps) {
  return (
    <div
      className={cn(
        "rounded-full border-2 border-foreground overflow-hidden",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-cover"
      />
    </div>
  );
}
