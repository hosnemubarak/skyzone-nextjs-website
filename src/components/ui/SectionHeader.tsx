"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      {label && (
        <>
          <span className="section-label">{label}</span>
          <div
            className={`w-12 h-1 bg-accent rounded-full mt-3 mb-4 ${
              align === "center" ? "mx-auto" : ""
            }`}
          />
        </>
      )}
      <h2
        className={`text-3xl md:text-4xl font-heading font-bold ${
          light ? "text-white" : "text-text-dark"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg text-gray-500 mt-4 max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
