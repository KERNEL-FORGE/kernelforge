import Layout from "@/components/Layout";
import Expertises from "@/components/sections/Expertises";
import CTA from "@/components/sections/CTA";
import { motion } from "framer-motion";

const ExpertisesPage = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pt-12">
          <Expertises />
        </div>
        <CTA />
      </motion.div>
    </Layout>
  );
};

export default ExpertisesPage;
