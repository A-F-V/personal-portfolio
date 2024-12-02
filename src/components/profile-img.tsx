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
    <div className="relative">
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full blur-xl bg-foreground/30 animate-pulse"
        style={{ width: size + 20, height: size + 20, margin: -10 }}
      />

      <div
        className={cn(
          "relative rounded-full overflow-hidden",
          "shadow-[0_0_15px_var(--foreground)]",
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
    </div>
  );
}
