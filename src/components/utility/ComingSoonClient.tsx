"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Clock, Home, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ComingSoonClient() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  } as const;

  const steps = [
    { label: "Product Catalog Decoupling", done: true },
    { label: "Brand Structure Decoupling", done: true },
    { label: "Dynamic Filtering System", done: true },
    { label: "Official Launch & Live Deployment", done: false },
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-28 pb-16 bg-primary text-white relative overflow-hidden">
      {/* Dynamic Glowing Blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-electric/15 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl w-full px-5 text-center z-10"
      >
        {/* Animated Clock Badge */}
        <motion.div variants={itemVariants} className="inline-block">
          <div className="relative w-20 h-20 bg-accent/15 rounded-full flex items-center justify-center mx-auto mb-6 text-accent border border-accent/30 glow-accent">
            <Clock className="w-10 h-10 animate-pulse" />
          </div>
        </motion.div>

        {/* Pill Tag */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="text-xs bg-accent/20 border border-accent/30 text-accent px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
            Launching Soon
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mt-4 leading-tight"
        >
          Exciting Energy Solutions <br />
          <span className="gradient-text">Coming Soon</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-white/70 mt-6 leading-relaxed max-w-lg mx-auto"
        >
          We are currently crafting a state-of-the-art interactive catalog system for Knox's latest sustainable solar panels, smart VFD pumping systems, and battery storage units.
        </motion.p>

        {/* Interactive Subscription Form */}
        <motion.div variants={itemVariants} className="max-w-md mx-auto mt-10">
          {!isSubscribed ? (
            <form
              onSubmit={handleSubscribe}
              className="p-1.5 bg-white/5 backdrop-blur border border-white/10 rounded-2xl flex flex-col sm:flex-row gap-2 transition-all duration-300 focus-within:border-accent/40"
            >
              <div className="flex-1 flex items-center gap-2 px-3 py-2">
                <Mail className="w-4 h-4 text-white/40 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to get notified"
                  required
                  className="w-full bg-transparent border-none outline-none text-sm placeholder:text-white/40 text-white focus:ring-0"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-accent hover:bg-accent-dark text-primary font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-55"
              >
                {isLoading ? "Subscribing..." : "Notify Me"}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-5 bg-white/5 backdrop-blur-md border border-green-500/20 rounded-2xl text-center flex flex-col items-center justify-center gap-2 shadow-lg"
            >
              <CheckCircle2 className="w-10 h-10 text-green-400" />
              <h3 className="font-heading font-semibold text-white">Subscription Successful!</h3>
              <p className="text-xs text-white/70">
                You will be the first to know when this section goes live at <span className="text-accent">{email}</span>.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Launch Tracker Card */}
        <motion.div
          variants={itemVariants}
          className="max-w-md mx-auto mt-12 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-left"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-bold text-sm text-white">Development Progress</h3>
            <span className="text-xs font-semibold text-accent">85% Complete</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
              className="h-full bg-gradient-to-r from-accent to-electric-light rounded-full"
            />
          </div>

          <div className="space-y-2.5">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                    step.done
                      ? "bg-green-500/20 border-green-500/40 text-green-400"
                      : "bg-white/5 border-white/20 text-white/40"
                  }`}
                >
                  {step.done ? "✓" : "•"}
                </div>
                <span className={step.done ? "text-white/80" : "text-white/40 font-medium"}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer Navigation Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-white/10 pt-8"
        >
          <Button href="/" variant="secondary" size="md" icon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
          <Button href="/products" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Browse Active Products
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
