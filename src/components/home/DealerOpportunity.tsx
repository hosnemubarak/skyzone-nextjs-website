"use client";

import { ArrowRight, TrendingUp, Truck, HandshakeIcon, BadgeDollarSign } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

const benefits = [
  { icon: TrendingUp, text: "High profit margins" },
  { icon: Truck, text: "Fast & reliable supply chain" },
  { icon: HandshakeIcon, text: "Dedicated dealer support" },
  { icon: BadgeDollarSign, text: "Exclusive dealer pricing" },
];

export default function DealerOpportunity() {
  return (
    <section className="py-16 md:py-24 bg-bg-light">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <ScrollReveal direction="left">
            <SectionHeader
              label="Partner With Us"
              title="Become a Sky Zone Dealer"
              align="left"
            />
            <p className="text-gray-600 mt-6 leading-relaxed">
              Join our growing network of authorized dealers across Bangladesh.
              Get access to premium energy products at exclusive prices, dedicated
              support, and marketing resources to grow your business.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {benefits.map((b) => (
                <div key={b.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-text-dark">{b.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button
                variant="primary"
                href="/contact"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Become a Dealer
              </Button>
            </div>
          </ScrollReveal>

          {/* Visual card */}
          <ScrollReveal direction="right">
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 hero-grid-pattern opacity-30" />
              <div className="relative">
                <span className="inline-block bg-accent/20 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                  Dealer Program
                </span>
                <h3 className="text-2xl font-heading font-bold">
                  Grow Your Business With Us
                </h3>
                <p className="text-white/70 mt-3 leading-relaxed">
                  We provide everything you need to succeed — from product training
                  and marketing materials to competitive pricing and priority stock allocation.
                </p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-sm font-heading font-semibold text-accent">Priority Stock</p>
                    <p className="text-xs text-white/60 mt-1">Guaranteed product allocation</p>
                  </div>
                  <div>
                    <p className="text-sm font-heading font-semibold text-accent">Expert Training</p>
                    <p className="text-xs text-white/60 mt-1">Technical workshops & support</p>
                  </div>
                  <div>
                    <p className="text-sm font-heading font-semibold text-accent">Marketing Kits</p>
                    <p className="text-xs text-white/60 mt-1">Digital assets & print designs</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
