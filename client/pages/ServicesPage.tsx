import Layout from "@/components/Layout";
import Services from "@/components/sections/Services";
import CTA from "@/components/sections/CTA";
import { motion } from "framer-motion";

const ServicesPage = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pt-12">
          <Services />
        </div>
        <CTA />
      </motion.div>
    </Layout>
  );
};

export default ServicesPage;
