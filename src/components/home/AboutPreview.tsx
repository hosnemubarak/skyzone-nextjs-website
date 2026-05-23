"use client";

import Image from "next/image";
import { CheckCircle, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

const features = [
  "Certified Quality Products",
  "Nationwide Distribution Network",
  "Expert Technical Support",
  "Competitive Pricing",
];

export default function AboutPreview() {
  return (
    <section className="bg-bg-light py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <ScrollReveal direction="left">
            <SectionHeader
              label="About Us"
              title="Your Trusted Partner in Energy Solutions"
              align="left"
            />
            <p className="text-gray-600 mt-6 leading-relaxed">
              Sky Zone International is a leading Bangladesh-based supplier,
              importer, and distributor of premium energy and electrical
              solutions. Since our founding, we have been committed to powering
              homes, businesses, and industries with reliable, certified
              products from globally trusted brands.
            </p>
            <ul className="space-y-3 mt-6">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-text-dark font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button
                variant="outline"
                href="/about"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Learn More About Us
              </Button>
            </div>
          </ScrollReveal>

          {/* Image side */}
          <ScrollReveal direction="right">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about-team.png"
                alt="Sky Zone International team"
                width={600}
                height={450}
                className="w-full h-auto rounded-xl"
              />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border border-gray-100 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-accent shrink-0" />
                <div>
                  <p className="text-sm font-heading font-bold text-primary leading-tight">
                    Certified Partner
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Global Quality Standards</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
