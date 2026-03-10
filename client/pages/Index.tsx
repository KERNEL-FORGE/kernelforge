import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Community from "@/components/sections/Community";
import Expertises from "@/components/sections/Expertises";
import BlogPreview from "@/components/sections/BlogPreview";
import CTA from "@/components/sections/CTA";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <Layout>
      <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white overflow-x-hidden">
        <Hero />
        <Services />
        <BlogPreview />
        <Community />
        <Expertises />
        <CTA />

        {/* Bottom Background Glows */}
        <div className="fixed bottom-0 left-0 w-full h-96 bg-primary/10 rounded-full blur-[160px] -z-10 pointer-events-none" />
      </div>
    </Layout>
  );
}
