"use client";

import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function BrandsPartners() {
  return (
    <section className="py-16 md:py-24 bg-bg-light/50">
      <div className="max-w-[1200px] mx-auto px-5">
        <SectionHeader
          label="Our Partner"
          title="Authorized Brand Partner"
          subtitle="We partner exclusively with Knox to deliver premium, reliable energy products nationwide"
          align="center"
        />

        <ScrollReveal direction="up" delay={0.1}>
          <div className="max-w-3xl mx-auto mt-12 bg-white border border-gray-100 rounded-2xl p-8 md:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="relative w-48 h-24 md:w-56 md:h-28 shrink-0 flex items-center justify-center bg-bg-light/60 rounded-xl overflow-hidden p-4 border border-gray-100">
              <Image
                src="/images/brand-knox.jpeg"
                alt="Knox Logo"
                fill
                className="object-contain p-2"
                sizes="(max-w-768px) 192px, 224px"
              />
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="text-xl md:text-2xl font-heading font-bold text-text-dark">
                Exclusive Authorized Distributor
              </h3>
              <p className="text-sm md:text-base text-gray-500 mt-3 leading-relaxed">
                Sky Zone International is proud to be the premier authorized distributor of <strong>Knox</strong> products in Bangladesh. We supply Knox&apos;s complete catalog of smart hybrid inverters, advanced Lithium energy storage systems (ESS), agricultural solar VFDs, and cloud communications modules.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="text-[11px] bg-primary/5 text-primary border border-primary/10 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  Genuine Products
                </span>
                <span className="text-[11px] bg-accent/20 text-accent-dark border border-accent/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  Official Warranty
                </span>
                <span className="text-[11px] bg-electric/10 text-electric border border-electric/15 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  Full Tech Support
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
