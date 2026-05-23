"use client";

import { motion } from "framer-motion";
import { Search, Folder, HelpCircle, ArrowRight, Home } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState, FormEvent } from "react";

interface Category {
  name: string;
  slug: string;
  productCount: number;
}

interface SearchNotFoundClientProps {
  categories: Category[];
}

export default function SearchNotFoundClient({ categories }: SearchNotFoundClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

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
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full px-5 text-center z-10"
      >
        {/* Search empty icon container */}
        <motion.div variants={itemVariants} className="inline-block">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary border border-primary/10 shadow-sm">
            <Search className="w-10 h-10" />
          </div>
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-heading font-extrabold text-text-dark leading-tight"
        >
          No Results Found
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-gray-500 mt-3 leading-relaxed max-w-md mx-auto"
        >
          We couldn&apos;t find any Knox products matching your exact query. Try refining your spelling, using simpler keywords, or browsing by category below.
        </motion.p>

        {/* Central Search Form */}
        <motion.div variants={itemVariants} className="max-w-md mx-auto mt-8">
          <form
            action="/products"
            method="GET"
            className="p-1.5 bg-white border border-gray-200 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-sm focus-within:border-primary/45 transition-all duration-300"
          >
            <div className="flex-1 flex items-center gap-2 px-3 py-2">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search inverters, batteries, VFDs..."
                className="w-full bg-transparent border-none outline-none text-sm text-text-dark placeholder:text-gray-400 focus:ring-0"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-300 shadow-sm cursor-pointer hover:shadow"
            >
              Search Again
            </button>
          </form>
        </motion.div>

        {/* Categories helper links */}
        <motion.div variants={itemVariants} className="mt-10 max-w-md mx-auto">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-4 font-heading">
            <Folder className="w-3.5 h-3.5" />
            Or Browse Categories
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories
              .filter((c) => c.slug !== "future-products")
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className="text-xs bg-white hover:bg-primary hover:text-white hover:border-primary text-text-dark px-4 py-2.5 rounded-full transition-all duration-300 border border-gray-200 font-semibold shadow-sm hover:shadow"
                >
                  {cat.name} ({cat.productCount})
                </Link>
              ))}
          </div>
        </motion.div>

        {/* Footnotes / Help */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
        >
          <Button href="/" variant="outline" size="md" icon={<Home className="w-4 h-4" />}>
            Go Back Home
          </Button>
          <Button href="/contact" variant="primary" size="md" icon={<HelpCircle className="w-4 h-4" />}>
            Ask for Assistance
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
