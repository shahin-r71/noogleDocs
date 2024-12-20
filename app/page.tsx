import Footer from "@/components/Footer";
import { Guide } from "@/components/Guide";
import Header from "@/components/header";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Edit3, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center relative">
      <Header className="absolute top-0 left-0 right-0 z-50">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="w-28 h-10 rounded-lg text-blue-500 bg-white border border-blue-500 text-sm">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </Header>
      <section className="hero_container">
        <HeroSection />
      </section>
      <main>
        <section className="">
          <Guide />
        </section>

        <section>
          <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 p-4">
            <FeatureCard
              icon={<Edit3 className="h-10 w-10 text-blue-500" />}
              title="Real-Time Editing"
              description="Edit documents simultaneously with your team members."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-blue-500" />}
              title="Easy Collaboration"
              description="Invite others to view or edit your documents with a simple link."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-blue-500" />}
              title="Instant Sync"
              description="Changes are saved and synced instantly across all devices."
            />
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
