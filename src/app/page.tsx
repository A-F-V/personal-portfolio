import { Container } from "@/components/container";
import { ProfileImage } from "@/components/profile-img";
import Image from "next/image";
import { ProjectButton, ProjectInfo } from "./project-button";
import { MacIcon, ReadwiseIcon } from "@/components/icon";
import { ObsidianIcon } from "@/components/icon";
//import Link from "next/link";

function SocialLinks() {
  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/alessandro-farace-587959193/",
      icon: "linkedin",
      label: "LinkedIn",
    },
    {
      href: "https://github.com/A-F-V",
      icon: "github",
      label: "GitHub",
    },

    {
      href: "https://alessandrofv.substack.com/",
      icon: "substack",
      label: "Substack",
    },
    {
      href: "https://www.reddit.com/user/AFV_7/",
      icon: "reddit",
      label: "Reddit",
    },
    {
      href: "https://x.com/AFV_7",
      icon: "twitter",
      label: "Twitter",
    },

    {
      href: "https://bsky.app/profile/alessandrofv.bsky.social",
      icon: "bluesky",
      label: "Bluesky",
    },
  ];

  return (
    <div className="flex justify-center space-x-6 sm:space-x-8 text-2xl sm:text-3xl">
      {socialLinks.map(({ href, icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="h-[32px] sm:h-[36px] flex items-center justify-center"
        >
          {icon === "substack" ? (
            <Image
              src="/substack.svg"
              alt="Substack"
              width={20}
              height={20}
              className="invert sm:w-6 sm:h-6"
            />
          ) : (
            <i className={`fa-brands fa-${icon} sm:w-6 sm:h-6`} />
          )}
        </a>
      ))}
    </div>
  );
}

function Projects() {
  const projects: ProjectInfo[] = [
    {
      name: "✨ Janus",
      href: "https://getwaitlist.com/waitlist/23183",
      description:
        "Automatically transform your notes and reading highlights into time-efficient flashcards",
      status: "waitlist",
      stack: [MacIcon, ObsidianIcon, ReadwiseIcon],
    },
    {
      name: "Arcana",
      href: "https://github.com/A-F-V/obsidian-arcana",
      description:
        "Supercharge your Obsidian note-taking with AI-powered insights and suggestions ",
      status: "released",
      stack: [ObsidianIcon],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-center mb-6">
      {projects.map((project) => (
        <ProjectButton key={project.name} project={project} />
      ))}
    </div>
  );
}

/*
function LineBreak() {
  return (
    <div className="flex items-center justify-center my-4">
      <div className="hidden sm:block w-[1px] border-t border-foreground/90" />
    </div>
  );
}
*/
function Roles() {
  const roles = [
    /*
    "wistful cambridge cs grad",
    "hungry and foolish indie hacker", 
    "knowledge gardener",
    */
    "building better tools for knowledge gardeners 🌸",
  ];

  return (
    <div className="text-center  text-sm sm:text-lg px-4 mb-6">
      {roles.map((role, index) => (
        <>
          <span key={role} className="mx-2 sm:mx-4 block sm:inline">
            {role}
          </span>
          {index < roles.length - 1 && (
            <span className="hidden sm:inline text-foreground/10">·</span>
          )}
        </>
      ))}
    </div>
  );
}

/*
function NavLinks() {
  const navLinks = [
    { href: "/about", text: "me" },
    { href: "/story", text: "journey" },
  ];

  return (
    <div className="text-center mb-6 sm:mb-8 italic text-xl sm:text-2xl flex items-center justify-center space-x-6 sm:space-x-8">
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} className="hover:underline">
          {link.text}
        </Link>
      ))}
    </div>
  );
}
*/
export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen font-poppins text-foreground px-4 sm:px-0">
      <Container>
        <div className="flex justify-center mb-4">
          <ProfileImage
            src="/profile.jpg"
            alt="Alessandro Farace"
            size={120}
            className="border-2 sm:border-4 sm:w-[320px] sm:h-[320px]"
          />
        </div>

        <h1 className="text-2xl sm:text-5xl text-center mb-3 sm:mb-4  font-bold">
          Alessandro Farace
        </h1>

        <Roles />
        <Projects />
        <SocialLinks />
      </Container>
    </div>
  );
}
