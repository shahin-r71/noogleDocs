"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { TypewriterEffect } from "./ui/typewritter-effect";
import Link from "next/link";
import { ArrowRight} from "lucide-react";


export function HeroSection() {
  const words = [
    {
      text: "Collaborate",
      className: "text-white",
    },
    {
      text: "on",
      className: "text-white",
    },
    {
      text: "Documents",
      className: "text-white",
    },
    {
      text: "in",
      className: "text-white",
    },
    {
      text: "Realtime",
      className: "text-white",
    },
    {
      text: "with",
      className: "text-white",
    },
    {
      text: "NoogleDocs.",
      className: "text-blue-400 dark:text-blue-300",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[35rem]">
      <p className="text-neutral-400  dark:text-neutral-200 text-base sm:text-lg  mb-10">
        The road to creativity starts from here
      </p>
      <TypewriterEffect words={words} />
      <div className="mt-10">
        <SignedOut>
          <SignInButton>
            <button className="w-40 h-10 flex items-center justify-center gap-1 text-md rounded-lg bg-blue-300 hover:bg-blue-400 text-black">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href="/documents">
            <button className="w-40 h-10 rounded-lg bg-blue-300 text-black border border-black text-sm">
              Create Document
            </button>
          </Link>
        </SignedIn>
      </div>
    </div>
  );
}
