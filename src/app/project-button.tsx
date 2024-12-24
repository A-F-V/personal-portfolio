"use client";

import Link from "next/link";
import { IconType, Icon } from "@/components/icon";
import { Badge } from "@/components/badge";
import { sendGAEvent } from "@next/third-parties/google";

export type ProjectStatus = "released" | "in-progress" | "waitlist";
export type ProjectInfo = {
  name: string;
  icon?: IconType;
  id: string;
  href: string;
  description: string;
  status: ProjectStatus;
  stack: IconType[];
};

export function ProjectButton({ project }: { project: ProjectInfo }) {
  return (
    <Link
      href={project.href}
      onClick={() => sendGAEvent("project_click", { value: project.id })}
      className="block w-72 h-48 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br to-midground from-preground opacity-90 z-0"></div>
      <div className="relative z-10 h-full p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-left gap-2">
            {project.icon && <Icon icon={project.icon} size={40} />}
            <h3 className="text-xl font-bold text-foreground mb-2 decoration-foreground/30 underline underline-offset-4 decoration-1 group-hover:decoration-2 transition-all duration-300">
              {project.name}
            </h3>
          </div>
          <p className="text-foreground/80 text-sm mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
            {project.description}
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Badge
              variant={project.status === "released" ? "default" : "outline"}
              className="text-xs font-semibold"
            >
              {project.status}
            </Badge>
            <div className="flex space-x-2">
              {project.stack.map((icon, index) => (
                <Icon key={index} icon={icon} size={30} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
