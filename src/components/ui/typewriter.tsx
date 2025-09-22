"use client";

import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

// New types for mixed content
interface TextElement {
    type: "text";
    content: string;
}

interface ImageElement {
    type: "image";
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
}

type ContentElement = TextElement | ImageElement;

interface TypewriterProps {
    text?: string | string[];
    content?: ContentElement[]; // New prop for mixed content
    speed?: number;
    initialDelay?: number;
    waitTime?: number;
    deleteSpeed?: number;
    loop?: boolean;
    className?: string;
    showCursor?: boolean;
    hideCursorOnType?: boolean;
    cursorChar?: string | React.ReactNode;
    cursorAnimationVariants?: {
        initial: Variants["initial"];
        animate: Variants["animate"];
    };
    cursorClassName?: string;
    imageAnimationDuration?: number; // How long to show image before next element
}

const Typewriter = ({
    text,
    content,
    speed = 50,
    initialDelay = 0,
    waitTime = 2000,
    deleteSpeed = 30,
    loop = true,
    className,
    showCursor = true,
    hideCursorOnType = false,
    cursorChar = "|",
    cursorClassName = "ml-1",
    imageAnimationDuration = 1000,
    cursorAnimationVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.01,
                repeat: Infinity,
                repeatDelay: 0.4,
                repeatType: "reverse",
            },
        },
    },
}: TypewriterProps) => {
    const [displayElements, setDisplayElements] = useState<React.ReactNode[]>(
        []
    ); // what is currently rendered
    const [charIndex, setCharIndex] = useState(0); // position within the current element (characters for text, 0/1 for images)
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentContentIndex, setCurrentContentIndex] = useState(0); // which element (text/image) we're on

    // Convert text prop to content format for backward compatibility
    const processedContent = useMemo(() => {
        if (content) return content;

        const texts = Array.isArray(text) ? text : [text || ""];
        return texts.map((t) => ({ type: "text" as const, content: t }));
    }, [text, content]);

    const currentElement = processedContent[currentContentIndex];

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (!currentElement) return;

        const startTyping = () => {
            // DELETING MODE
            if (isDeleting) {
                if (displayElements.length === 0) {
                    // Finished deleting current element – move to next
                    setIsDeleting(false);

                    if (
                        currentContentIndex === processedContent.length - 1 &&
                        !loop
                    ) {
                        return; // completed all elements and looping disabled
                    }

                    setCurrentContentIndex(
                        (prev) => (prev + 1) % processedContent.length
                    );
                    setCharIndex(0);
                    timeout = setTimeout(() => {}, waitTime);
                } else {
                    // Remove last character / element
                    timeout = setTimeout(() => {
                        setDisplayElements((prev) => prev.slice(0, -1));
                    }, deleteSpeed);
                }
                return;
            }

            // TYPING MODE
            if (currentElement.type === "text") {
                if (charIndex < currentElement.content.length) {
                    timeout = setTimeout(() => {
                        setDisplayElements((prev) => [
                            ...prev,
                            currentElement.content[charIndex],
                        ]);
                        setCharIndex((prev) => prev + 1);
                    }, speed);
                } else {
                    // Finished typing current text – wait then delete
                    timeout = setTimeout(() => {
                        setIsDeleting(true);
                    }, waitTime);
                }
            } else if (currentElement.type === "image") {
                if (charIndex === 0) {
                    // show image
                    const imageElement = (
                        <motion.div
                            key={`image-${currentContentIndex}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-block"
                        >
                            <Image
                                src={currentElement.src}
                                alt={currentElement.alt}
                                width={currentElement.width || 24}
                                height={currentElement.height || 24}
                                className={cn(
                                    "inline-block",
                                    currentElement.className
                                )}
                            />
                        </motion.div>
                    );
                    setDisplayElements((prev) => [...prev, imageElement]);
                    setCharIndex(1);

                    timeout = setTimeout(() => {
                        setIsDeleting(true);
                    }, waitTime);
                }
            }
        };

        // Apply initial delay only at the start
        if (charIndex === 0 && !isDeleting && displayElements.length === 0) {
            timeout = setTimeout(startTyping, initialDelay);
        } else {
            startTyping();
        }

        return () => clearTimeout(timeout);
    }, [
        charIndex,
        displayElements.length,
        isDeleting,
        speed,
        deleteSpeed,
        waitTime,
        currentContentIndex,
        loop,
        initialDelay,
        imageAnimationDuration,
        processedContent.length,
        currentElement,
    ]);

    return (
        <div
            className={`inline whitespace-pre-wrap tracking-tight ${className}`}
        >
            <span>{displayElements}</span>
            {showCursor && (
                <motion.span
                    variants={cursorAnimationVariants}
                    className={cn(
                        cursorClassName,
                        hideCursorOnType &&
                            (isDeleting ||
                                (currentElement.type === "text" &&
                                    charIndex < currentElement.content.length))
                            ? "hidden"
                            : ""
                    )}
                    initial="initial"
                    animate="animate"
                >
                    {cursorChar}
                </motion.span>
            )}
        </div>
    );
};

export default Typewriter;
