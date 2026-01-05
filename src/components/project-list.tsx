import { Icon, JanusIcon, ObsidianIcon } from "@/components/icon";
import { MinorHeading } from "./headings";
import { IconType } from "./icon";
import { ProjectCard } from "./project-card";
import { FaCodeCommit } from "react-icons/fa6";

const headingIcon: IconType = {
    img: FaCodeCommit,
};

const featuredProjects = [
    {
        title: "Janus",
        keywords: ["flashcards", "spaced repetition"],
        description:
            "Transform your documents, videos, notes and highlights into flashcards for Anki and Mochi",
        href: "https://janus.cards",
        icon: <Icon icon={JanusIcon} className="size-16" />,
        image: "/janus-opengraph.png",
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

export function ProjectList() {
    return (
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
                        image={project.image}
                    />
                ))}
            </div>
        </div>
    );
}
