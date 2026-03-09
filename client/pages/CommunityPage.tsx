import Layout from "@/components/Layout";
import Community from "@/components/sections/Community";
import CTA from "@/components/sections/CTA";
import { motion } from "framer-motion";

const CommunityPage = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pt-12">
          <Community />
        </div>
        <CTA />
      </motion.div>
    </Layout>
  );
};

export default CommunityPage;
