import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";

const DoctorCard = lazy(() => import("../pages/DoctorCard"));

const DoctorSection = () => (
  <Suspense fallback={<div className="loading-spinner"><div className="spinner"></div></div>}>
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <DoctorCard />
    </motion.div>
  </Suspense>
);

export default DoctorSection;
