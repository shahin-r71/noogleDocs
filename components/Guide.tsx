"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Sign Up or Log In",
    description:
      "Create an account or log in to access your personal dashboard.You can use github or google account to easily log in create a new account ",
    content: (
      <div className="h-full w-full p-1 flex items-center justify-center text-white">
        <Image
          src="/assets/images/login.png"
          width={300}
          height={300}
          className="h-full w-full"
          alt="login"
          quality={100}
          unoptimized
        />
      </div>
    ),
  },
  {
    title: "Create a Document",
    description:
      "Start a new document from scratch or use one of our templates",
    content: (
      <div className="h-full w-full p-1 flex items-center justify-center text-white">
        <Image
          src="/assets/images/create.png"
          width={300}
          height={300}
          className="h-full w-full"
          alt="create document"
          quality={100}
          unoptimized
        />
      </div>
    ),
  },
  {
    title: "Edit Your Document",
    description:
      "Use our intuitive editor to write, format, and structure your content.",
    content: (
      <div className="h-full w-full p-1 flex items-center justify-center text-white">
        <Image
          src="/assets/images/edit.png"
          width={300}
          height={300}
          className="h-full w-full"
          alt="edit document"
          quality={100}
          unoptimized
        />
      </div>
    ),
  },
  {
    title: "Share with Others",
    description:
      "Invite team members or clients to view or edit your document.",
    content: (
      <div className="h-full w-full p-1 flex items-center justify-center text-white">
        <Image
          src="/assets/images/share.png"
          width={300}
          height={300}
          className="h-full w-full"
          alt="share document"
          quality={100}
          unoptimized
        />
      </div>
    ),
  },
  {
    title: "Collaborate in Real-Time",
    description: "Work together simultaneously, seeing changes as they happen",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/assets/images/collaborate.png"
          width={300}
          height={300}
          className="h-full w-full"
          alt="collaborate with others"
          quality={100}
          unoptimized
        />
      </div>
    ),
  },
  {
    title: "That's all you need to get started.",
    description: "",
  },
];
export function Guide() {
  return (
    <div className="p-10 sm:mt-11">
      <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
        How It Works
      </h2>
      <StickyScroll content={content} />
    </div>
  );
}
