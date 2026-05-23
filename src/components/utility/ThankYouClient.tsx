"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Home, ArrowRight, ClipboardList, ShieldCheck, MailCheck, Truck } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ThankYouClient() {
  const steps = [
    {
      icon: <ClipboardList className="w-5 h-5" />,
      title: "Inquiry Logged",
      desc: "Your request is registered in our B2B CRM and assigned to an energy specialist.",
      status: "completed",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Technical Review",
      desc: "Our engineers evaluate load capacities, specs, and stock availability for Knox series.",
      status: "pending",
    },
    {
      icon: <MailCheck className="w-5 h-5" />,
      title: "Official Proposal",
      desc: "We send a custom price quotation and warranty breakdown to your inbox.",
      status: "pending",
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: "Delivery & Setup",
      desc: "Upon approval, we coordinate secure logistics and certified field installation.",
      status: "pending",
    },
  ];

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
      <div className="absolute top-10 left-10 w-60 h-60 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl w-full px-5 text-center z-10"
      >
        {/* Success checkmark with dynamic rings */}
        <motion.div variants={itemVariants} className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping opacity-75" />
          <div className="relative w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-600 border border-green-500/20 shadow-md">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <span className="text-xs bg-green-500/10 border border-green-500/15 text-green-700 px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
            Submission Successful
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-4xl font-heading font-extrabold text-text-dark mt-4"
        >
          Thank You for Reaching Out
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed max-w-lg mx-auto"
        >
          Your inquiry has been successfully received. A technical sales engineer from Sky Zone International will review your requirements and reach out within 24 hours.
        </motion.p>

        {/* Process Roadmap Timeline */}
        <motion.div
          variants={itemVariants}
          className="mt-12 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm text-left max-w-2xl mx-auto"
        >
          <h3 className="font-heading font-bold text-sm text-text-dark uppercase tracking-widest border-b border-gray-100 pb-3 mb-6">
            B2B Procurement Process Steps
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start relative">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    step.status === "completed"
                      ? "bg-green-500/10 border-green-500/20 text-green-600 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                      : "bg-bg-light border-gray-200 text-gray-400"
                  }`}
                >
                  {step.icon}
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-sm text-text-dark flex items-center gap-1.5">
                    {step.title}
                    {step.status === "completed" && (
                      <span className="text-[10px] bg-green-500/10 text-green-700 font-bold px-2 py-0.5 rounded-full uppercase">
                        Done
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Redirects */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-gray-100 pt-8 max-w-xl mx-auto"
        >
          <Button href="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
          <Button href="/products" variant="outline" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Explore Products
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
