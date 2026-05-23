import Image from "next/image";
import { Target, Eye, Shield, Lightbulb, Award, Heart, BadgeCheck, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Sky Zone International — Bangladesh's leading supplier of solar panels, inverters, batteries, and electrical equipment. Our mission, vision, and journey.",
};

const coreValues = [
  { icon: Shield, title: "Integrity", desc: "Transparent business practices and honest partnerships built on trust." },
  { icon: Lightbulb, title: "Innovation", desc: "Embracing cutting-edge technology and forward-thinking energy solutions." },
  { icon: Award, title: "Excellence", desc: "Uncompromising commitment to quality in every product and service." },
  { icon: Heart, title: "Customer First", desc: "Every decision driven by the needs and success of our customers." },
];

const certifications = [
  { title: "ISO 9001:2015", subtitle: "Quality Management System" },
  { title: "IEC 61215", subtitle: "Solar Panel Testing Standard" },
  { title: "IEC 61730", subtitle: "Solar Panel Safety Standard" },
  { title: "CE Marking", subtitle: "European Conformity" },
];

const timeline = [
  { year: "Q1 2026", title: "Company Founded", desc: "Sky Zone International was founded in Chittagong with a vision to transform Bangladesh's energy landscape." },
  { year: "Q2 2026", title: "Initial Installations", desc: "Reached our initial milestones with successful solar and power installations across Bangladesh." },
  { year: "Q3 2026", title: "Regional Expansion", desc: "Grew our distribution network to cover multiple regions with dedicated logistics and support teams." },
  { year: "Q4 2026", title: "Launched Battery Division", desc: "Introduced our comprehensive battery and energy storage solutions division with lithium and lead-acid products." },
  { year: "2027+", title: "Enterprise Milestone", desc: "Targeting major enterprise projects and establishing partnerships with key global brands." },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <a href="/" className="hover:text-accent transition-colors">Home</a>
            <span>/</span>
            <span className="text-white">About</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
            About Sky Zone International
          </h1>
          <p className="text-lg text-white/70 mt-4 max-w-2xl">
            Building Bangladesh&apos;s energy future with trusted products, expert service, and a commitment to excellence.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-team.png"
                  alt="Sky Zone International team"
                  width={600}
                  height={450}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <SectionHeader
                label="Our Story"
                title="Building Bangladesh's Energy Future"
                align="left"
              />
              <p className="text-gray-600 mt-6 leading-relaxed">
                Founded in 2026 in Chittagong, Sky Zone International began with a clear mission: to make reliable, high-quality energy solutions accessible to every home and business in Bangladesh. What started as a small trading operation has grown into one of the country&apos;s most trusted suppliers of solar panels, inverters, batteries, and electrical equipment.
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Today, we partner with globally recognized brands to deliver certified products with nationwide distribution. Our dedicated team of engineers and sales professionals ensures every customer receives expert guidance from initial consultation through installation and after-sales support.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-bg-light">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionHeader label="Our Purpose" title="Mission & Vision" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <ScrollReveal direction="left">
              <div className="bg-white rounded-xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.08)] h-full">
                <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center">
                  <Target className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-xl mt-5 text-text-dark">Our Mission</h3>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  To provide affordable, reliable, and high-quality energy and electrical solutions that empower Bangladesh&apos;s homes, businesses, and industries. We are committed to bridging the gap between global technology and local needs through trusted products, expert service, and sustainable practices.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="bg-white rounded-xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.08)] h-full">
                <div className="w-14 h-14 rounded-full bg-electric/15 flex items-center justify-center">
                  <Eye className="w-7 h-7 text-electric" />
                </div>
                <h3 className="font-heading font-semibold text-xl mt-5 text-text-dark">Our Vision</h3>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  To become the leading energy solutions provider in South Asia, recognized for our commitment to innovation, quality, and customer satisfaction. We envision a future where every community has access to clean, reliable, and affordable energy — and we aim to be at the forefront of making that vision a reality.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionHeader label="Our Values" title="What Drives Us" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {coreValues.map((val, i) => (
              <ScrollReveal key={val.title} delay={i * 0.1}>
                <div className="bg-bg-light rounded-xl p-6 text-center hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-full bg-electric/10 text-electric mx-auto flex items-center justify-center">
                    <val.icon className="w-7 h-7" />
                  </div>
                  <h4 className="font-heading font-semibold mt-4 text-text-dark">{val.title}</h4>
                  <p className="text-sm text-gray-500 mt-2">{val.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-20 bg-bg-light">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionHeader label="Certifications" title="Quality You Can Trust" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:-translate-y-1 transition-all duration-300">
                  <BadgeCheck className="w-12 h-12 text-accent mx-auto" />
                  <h4 className="font-heading font-semibold text-text-dark mt-3">{cert.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{cert.subtitle}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionHeader label="Our Journey" title="Company Timeline" />
          <div className="relative mt-16">
            {/* Timeline line */}
            <div className="timeline-line" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                  <div className={`relative flex ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
                    {/* Dot */}
                    <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-white shadow-md -translate-x-1/2 top-6 z-10" />

                    {/* Content card */}
                    <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                      <div className="bg-bg-light rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-accent font-heading font-bold text-lg">{item.year}</span>
                        <h4 className="font-heading font-semibold text-text-dark mt-1">{item.title}</h4>
                        <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-heading font-bold text-white">
              Ready to Work With Us?
            </h2>
            <p className="text-white/70 mt-3 max-w-xl mx-auto">
              Partner with Sky Zone International for reliable energy solutions and expert support.
            </p>
            <div className="mt-6">
              <Button variant="primary" href="/contact" icon={<ArrowRight className="w-4 h-4" />}>
                Get in Touch
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
