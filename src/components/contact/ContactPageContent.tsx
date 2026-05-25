"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import SocialIcon from "@/components/ui/SocialIcon";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { companyInfo } from "@/data/navigation";

export default function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-electric focus:ring-2 focus:ring-electric/20 outline-none transition-all text-text-dark placeholder:text-gray-400";

  return (
    <>
      {/* Page Hero */}
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <a href="/" className="hover:text-accent transition-colors">Home</a>
            <span>/</span>
            <span className="text-white">Contact</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">Contact Us</h1>
          <p className="text-lg text-white/70 mt-4 max-w-2xl">
            Have a question or need a quote? Reach out to our team and we&apos;ll get back to you promptly.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">
            {/* Contact Form */}
            <ScrollReveal direction="left">
              <div>
                <h2 className="font-heading font-bold text-2xl text-text-dark">Send us a Message</h2>
                <p className="text-gray-500 mt-2">
                  Fill out the form below and our team will respond within 24 hours.
                </p>

                {submitted && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                    Thank you! Your message has been sent. We&apos;ll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClasses}
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={inputClasses}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClasses}
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClasses}
                    />
                  </div>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={inputClasses}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Installation Quote">Installation Quote</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Partnership">Partnership Opportunity</option>
                  </select>
                  <textarea
                    placeholder="Your Message *"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={inputClasses + " resize-none"}
                  />
                  <Button variant="primary" type="submit" className="w-full" icon={<Send className="w-4 h-4" />}>
                    Send Message
                  </Button>
                </form>
              </div>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal direction="right">
              <div className="space-y-6">
                {/* Info Card */}
                <div className="bg-primary rounded-xl p-8 text-white">
                  <h3 className="font-heading font-semibold text-xl">Contact Information</h3>
                  <div className="space-y-6 mt-6">
                    {[
                      {
                        icon: MapPin,
                        label: "Address",
                        value: companyInfo.address,
                        href: companyInfo.mapLink,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      },
                      {
                        icon: Phone,
                        label: "Phone",
                        value: companyInfo.phone,
                        href: `tel:${companyInfo.phone}`,
                      },
                      {
                        icon: Mail,
                        label: "Email",
                        value: companyInfo.email,
                        href: `mailto:${companyInfo.email}`,
                      },
                      {
                        icon: Clock,
                        label: "Business Hours",
                        value: `${companyInfo.hours}\n${companyInfo.closedDay}`,
                      },
                    ].map(({ icon: Icon, label, value, href, target, rel }) => (
                      <div key={label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-white/50 text-xs uppercase tracking-wider">{label}</p>
                          {href ? (
                            <a
                              href={href}
                              target={target}
                              rel={rel}
                              className="text-white/90 text-sm mt-0.5 block hover:text-accent transition-colors whitespace-pre-line font-medium"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="text-white/90 text-sm mt-0.5 whitespace-pre-line font-medium">{value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp */}
                <a
                  href={companyInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-whatsapp text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>

                {/* Social Links */}
                <div>
                  <p className="text-sm text-gray-500 mb-3">Follow us on social media</p>
                  <div className="flex gap-3">
                    {(["facebook", "linkedin", "youtube"] as const).map((type) => (
                      <a
                        key={type}
                        href={companyInfo.social[type === "youtube" ? "youtube" : type]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-bg-light flex items-center justify-center text-text-dark hover:bg-primary hover:text-white transition-all duration-300"
                        aria-label={type}
                      >
                        <SocialIcon type={type} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="pb-16 md:pb-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://maps.google.com/maps?q=22.3363729,91.8322532&z=18&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sky Zone International Office Location"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
