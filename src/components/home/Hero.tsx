"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowRight, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] bg-primary overflow-hidden flex items-center">
      {/* Background image */}
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        className="object-cover opacity-15"
        priority
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 hero-grid-pattern" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />

      {/* Content */}
      <div className="relative w-full max-w-[1200px] mx-auto px-5 flex items-center">
        <div className="max-w-2xl py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 text-accent text-sm px-4 py-1.5 rounded-full font-medium">
              🌞 Leading Energy Solutions Provider
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-[3.2rem] font-heading font-extrabold text-white leading-tight mt-6"
          >
            Powering Bangladesh with{" "}
            <span className="gradient-text">Reliable Energy</span> &amp;
            Electrical Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-white/70 mt-6 max-w-xl leading-relaxed"
          >
            Sky Zone International is your trusted partner for premium solar
            panels, inverters, batteries, and electrical equipment. We deliver
            certified quality products with nationwide distribution across Bangladesh.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <Button
              variant="primary"
              size="lg"
              href="/products"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Explore Products
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/contact"
              icon={<Phone className="w-5 h-5" />}
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </div>


    </section>
  );
}
