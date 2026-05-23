"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, ShieldAlert, Mail, RefreshCw, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function MaintenanceClient() {
  const [statusState, setStatusState] = useState<"idle" | "checking" | "online">("idle");

  const handleCheckStatus = () => {
    setStatusState("checking");
    setTimeout(() => {
      setStatusState("online");
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-xl w-full px-5 text-center z-10"
      >
        {/* Animated cog/wrench wheel */}
        <motion.div variants={itemVariants} className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping opacity-75" />
          <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary border border-gray-100 shadow-md glow-electric">
            <Settings className="w-10 h-10 animate-[spin_8s_linear_infinite] text-primary" />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-accent rounded-full border-4 border-white flex items-center justify-center text-primary shadow-md">
            <ShieldAlert className="w-4 h-4 text-primary-deeper" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <span className="text-xs bg-primary/10 border border-primary/15 text-primary px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
            System Upgrades
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-4xl font-heading font-extrabold text-text-dark mt-6 leading-tight"
        >
          Scheduled Maintenance
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed max-w-md mx-auto"
        >
          We are upgrading our servers and syncing the Knox product catalog database. We expect to be fully back online shortly. Thank you for your patience!
        </motion.p>

        {/* Dynamic Status Display Box */}
        <motion.div variants={itemVariants} className="mt-8 min-h-[80px]">
          <AnimatePresence mode="wait">
            {statusState === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center justify-center gap-4"
              >
                <button
                  onClick={handleCheckStatus}
                  className="bg-primary hover:bg-primary-dark text-white font-bold text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  Check Server Status
                </button>
                <Button href="/contact" variant="outline" size="md" icon={<Mail className="w-4 h-4" />}>
                  Support
                </Button>
              </motion.div>
            )}

            {statusState === "checking" && (
              <motion.div
                key="checking"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-white border border-gray-200 px-6 py-3 rounded-2xl shadow-sm text-gray-600"
              >
                <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm font-semibold">Verifying connection node clusters...</span>
              </motion.div>
            )}

            {statusState === "online" && (
              <motion.div
                key="online"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="inline-flex flex-col items-center gap-2 bg-green-500/10 border border-green-500/20 px-6 py-4 rounded-2xl shadow-sm max-w-sm mx-auto"
              >
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-sm font-bold">Node Status: Operational</span>
                </div>
                <p className="text-xs text-green-700/80 leading-normal">
                  Main gateway and products databases are live. Pages are finishing final assets compilation.
                </p>
                <button
                  onClick={() => setStatusState("idle")}
                  className="text-xs text-primary font-bold hover:underline mt-1"
                >
                  Check again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p variants={itemVariants} className="text-xs text-gray-400 mt-12">
          Expected resolution time: Today, 5:30 PM (BST)
        </motion.p>
      </motion.div>
    </div>
  );
}
