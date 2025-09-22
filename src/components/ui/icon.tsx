import { LucideIcon } from "lucide-react";

import Image from "next/image";

export type IconType = {
  img?: LucideIcon | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  imgSrc?: string;
};

type IconProps = {
  className?: string;
  icon: IconType;
  width?: number;
  height?: number;
};
export function Icon({ className, icon, width = 32, height = 32 }: IconProps) {
  return (
    <>
      {icon.img && (
        <div className={className}>
          <icon.img className="w-full h-full" />
        </div>
      )}
      {icon.imgSrc && (
        <Image
          src={icon.imgSrc}
          alt="Icon"
          className={className}
          width={width}
          height={height}
        />
      )}
    </>
  );
}
