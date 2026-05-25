"use client";

import { Phone, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { companyInfo } from "@/data/navigation";

export default function ContactCTA() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark py-16">
      <div className="max-w-[1200px] mx-auto px-5">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-heading font-bold text-white">
                Ready to Power Your Future?
              </h2>
              <p className="text-white/70 mt-2 max-w-xl">
                Get in touch with our team for product inquiries, installation
                quotes, or partnership opportunities. We&apos;re here to help.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                href="/contact"
                icon={<Phone className="w-4 h-4" />}
              >
                Contact Us
              </Button>
              <a
                href={companyInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-whatsapp text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
