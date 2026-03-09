import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Community from "@/components/sections/Community";
import Expertises from "@/components/sections/Expertises";
import CTA from "@/components/sections/CTA";
import Layout from "@/components/Layout";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Index() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Layout>
      <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white overflow-x-hidden">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent-pink z-[60] origin-left"
          style={{ scaleX }}
        />

        <Hero />
        <Services />
        <Community />
        <Expertises />
        <CTA />
        
        {/* Bottom Background Glows */}
        <div className="fixed bottom-0 left-0 w-full h-96 bg-primary/10 rounded-full blur-[160px] -z-10 pointer-events-none" />
      </div>
    </Layout>
  );
}
