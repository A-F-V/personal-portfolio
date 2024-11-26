import { Container } from "@/components/container";
import { ProfileImage } from "@/components/profile-img";
import Image from "next/image";
//import Link from "next/link";

function SocialLinks() {
  const socialLinks = [
    {
      href: "https://github.com/A-F-V",
      icon: "github",
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/alessandro-farace-587959193/",
      icon: "linkedin",
      label: "LinkedIn",
    },
    {
      href: "https://x.com/AFV_7",
      icon: "twitter",
      label: "Twitter",
    },
    {
      href: "https://alessandrofv.substack.com/",
      icon: "substack",
      label: "Substack",
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
            <i className={`fab fa-${icon}`} />
          )}
        </a>
      ))}
    </div>
  );
}

function Projects() {
  const projects = [
    {
      name: "arcana",
      href: "https://github.com/A-F-V/obsidian-arcana",
    },
  ];

  return (
    <div className="flex flex-col items-center space-y-2">
      {projects.map((project) => (
        <a
          key={project.name}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="italic no-underline hover:underline transition-all text-foreground/80"
        >
          {project.name}
        </a>
      ))}
    </div>
  );
}

function LineBreak() {
  return (
    <div className="flex items-center justify-center my-4">
      <div className="hidden sm:block w-[1px] border-t border-foreground/90" />
    </div>
  );
}

function Roles() {
  const roles = [
    /*
    "wistful cambridge cs grad",
    "hungry and foolish indie hacker",
    "knowledge gardener",
    */
    "building better tools for knowledge gardeners",
  ];

  return (
    <div className="text-center  text-md sm:text-xl px-4">
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
    <div className="flex items-center justify-center min-h-screen text-foreground px-4 sm:px-0">
      <Container>
        <div className="flex justify-center mb-4">
          <ProfileImage
            src="/profile.jpg"
            alt="Alessandro Farace"
            size={120}
            className="border-2 sm:border-4 sm:w-[320px] sm:h-[320px]"
          />
        </div>

        <h1 className="text-2xl sm:text-5xl   text-center mb-3 sm:mb-4 font-inter font-black">
          Alessandro Farace
        </h1>

        <Roles />
        <LineBreak />
        <Projects />
        <LineBreak />
        <SocialLinks />
      </Container>
    </div>
  );
}
