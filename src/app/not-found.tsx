"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Home, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  } as const;

  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-28 pb-16 bg-bg-light/35 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-electric/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-lg w-full px-5 text-center z-10"
      >
        <motion.div variants={itemVariants} className="inline-block">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent-dark shadow-md border border-accent/20 glow-accent animate-pulse">
            <AlertTriangle className="w-10 h-10" />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-7xl md:text-8xl font-heading font-extrabold text-primary leading-none tracking-tight"
        >
          404
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl font-heading font-bold text-text-dark mt-4"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed max-w-md mx-auto"
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-gray-100 pt-8"
        >
          <Button href="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
            Go Back Home
          </Button>
          <Button href="/products" variant="outline" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Explore Products
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
