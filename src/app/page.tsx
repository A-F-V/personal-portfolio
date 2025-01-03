"use client";
import { Container } from "@/components/container";
import { ProfileImage } from "@/components/profile-img";
import { ProjectButton, ProjectInfo } from "./project-button";
import {
  BlueskyIcon,
  GithubIcon,
  Icon,
  JanusIcon,
  LinkedInIcon,
  MacIcon,
  ReadwiseIcon,
  RedditIcon,
  SubstackIcon,
  TwitterIcon,
} from "@/components/icon";
import { ObsidianIcon } from "@/components/icon";
//import Link from "next/link";

function SocialLinks() {
  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/alessandro-farace-587959193/?ref=alessandrofv.com",
      icon: LinkedInIcon,
      label: "LinkedIn",
    },
    {
      href: "https://github.com/A-F-V?ref=alessandrofv.com",
      icon: GithubIcon,
      label: "GitHub",
    },

    {
      href: "https://alessandrofv.substack.com/?ref=alessandrofv.com",
      icon: SubstackIcon,
      label: "Substack",
    },
    {
      href: "https://www.reddit.com/user/AFV_7/?ref=alessandrofv.com",
      icon: RedditIcon,
      label: "Reddit",
    },
    {
      href: "https://x.com/AFV_7?ref=alessandrofv.com",
      icon: TwitterIcon,
      label: "Twitter",
    },

    {
      href: "https://bsky.app/profile/alessandrofv.bsky.social?ref=alessandrofv.com",
      icon: BlueskyIcon,
      label: "Bluesky",
    },
  ];

  return (
    <div className="flex justify-center space-x-6 sm:space-x-8 text-2xl sm:text-3xl">
      {socialLinks.map(({ href, icon }) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer">
          <Icon icon={icon} size={24} />
        </a>
      ))}
    </div>
  );
}

function Projects() {
  const projects: ProjectInfo[] = [
    {
      name: "Janus",
      icon: JanusIcon,
      id: "janus",
      href: "https://janus.cards",
      description:
        "Automatically transform your notes and reading highlights into time-efficient flashcards",
      status: "waitlist",
      stack: [MacIcon, ObsidianIcon, ReadwiseIcon],
    },
    {
      name: "Arcana",
      id: "arcana",
      href: "https://github.com/A-F-V/obsidian-arcana?ref=alessandrofv.com",
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
