"use client";

import Link from "next/link";
import { Sun, Zap, Battery, Power, Gauge, Cable, Wrench, Rocket, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { productCategories } from "@/data/products";

const iconMap: Record<string, React.ElementType> = {
  Sun, Zap, Battery, Power, Gauge, Cable, Wrench, Rocket,
};

export default function ProductCategories() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5">
        <SectionHeader
          label="Our Products"
          title="Comprehensive Energy Solutions"
          subtitle="From solar panels to electrical equipment — everything you need for reliable energy infrastructure"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">
          {productCategories.map((cat, i) => {
            const IconComp = iconMap[cat.icon] || Sun;
            return (
              <ScrollReveal key={cat.slug} delay={i * 0.1}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="block bg-primary p-6 rounded-xl text-white group hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-xl h-full"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <IconComp className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold mt-4">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-white/60 mt-2">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-1 text-accent text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    View Products
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
