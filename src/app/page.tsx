"use client";

import { MotionConfig } from "framer-motion";
import About from "@/components/About";
import { FaqSection, FinalCta, Footer } from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import MultiAccount from "@/components/MultiAccount";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Project from "@/components/Project";
import Tour from "@/components/Tour";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <Project />
        <Features />
        <Tour />
        <MultiAccount />
        <Pricing />
        <About />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </MotionConfig>
  );
}
