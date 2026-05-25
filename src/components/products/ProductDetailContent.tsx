"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  Mail,
  FileText,
  ArrowRight,
  ArrowLeft,
  Search,
  Layers,
  Settings,
  ShieldCheck,
  Box,
  Send,
  Building,
  Phone,
  Check,
  ChevronRight,
  X
} from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailContent({ product, relatedProducts }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<{ transformOrigin: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"specs" | "features">("specs");
  const [specQuery, setSpecQuery] = useState("");
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState(
    `Dear Sky Zone International, I am interested in inquiring about the "${product.name}". Please send me pricing, availability, and technical catalog information.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Image zoom on hover logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%` });
  };

  const handleMouseLeave = () => {
    setZoomStyle(null);
  };

  // Listen to scroll to display sticky summary bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToInquiry = () => {
    const el = document.getElementById("inquiry-form-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Form submission validation & handling
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = "Full name is required";
    if (!phone.trim()) tempErrors.phone = "Phone number is required";
    if (!email.trim()) {
      tempErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Invalid email format";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
    }, 1500);
  };

  // Specifications search filtering
  const filteredSpecs = product.specs.filter(
    (s) =>
      s.label.toLowerCase().includes(specQuery.toLowerCase()) ||
      s.value.toLowerCase().includes(specQuery.toLowerCase())
  );

  // Gallery interactive tabs definition
  const galleryViews = [
    { label: "Product Photo", icon: Layers },
    { label: "Technical Schematic", icon: Settings },
    { label: "Quality & QA", icon: ShieldCheck },
    { label: "Package Contents", icon: Box },
  ];

  return (
    <>
      {/* Sticky Product Summary Bar (Desktop) */}
      <div
        className={cn(
          "fixed top-[72px] left-0 right-0 bg-white border-b border-gray-200 z-40 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 transform hidden md:block",
          showStickyBar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-lg border border-gray-200 bg-bg-light overflow-hidden shrink-0">
              <Image src={product.image} alt="" fill className="object-contain p-1" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-text-dark line-clamp-1">{product.name}</h4>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{product.category} {product.series ? `• ${product.series}` : ""}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {!product.published ? (
              <span className="text-[10px] bg-amber-500 text-white font-bold px-2.5 py-0.5 rounded-full shadow-sm animate-pulse">
                Coming Soon
              </span>
            ) : product.badge && (
              <span className="text-[10px] bg-accent/20 text-accent-dark border border-accent/20 font-bold px-2.5 py-0.5 rounded-full">
                {product.badge}
              </span>
            )}
            <Button
              onClick={scrollToInquiry}
              variant="primary"
              size="sm"
              className="shadow-sm"
            >
              Request Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Floating CTA (Mobile) */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-40 md:hidden transition-all duration-300 transform",
          showStickyBar ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-90 pointer-events-none"
        )}
      >
        <Button
          onClick={scrollToInquiry}
          variant="primary"
          size="md"
          icon={<Mail className="w-4 h-4" />}
          className="shadow-[0_10px_25px_rgba(244,180,0,0.4)]"
        >
          Request Quote
        </Button>
      </div>

      {/* Page Breadcrumb Header */}
      <section className="bg-primary py-8 pt-32 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Link href="/" className="hover:text-accent transition-colors flex items-center gap-1">Home</Link>
            <ChevronRight className="w-4 h-4 text-white/30" />
            <Link href="/products" className="hover:text-accent transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4 text-white/30" />
            <span className="text-white truncate max-w-[200px] md:max-w-none font-medium">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Left: Image Showcase & Gallery (Grid Span 5) */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="left">
                <div className="space-y-4">
                  
                  {/* Main Gallery Viewer */}
                  <div>
                    {activeImage === 0 && (
                      <div
                        className="relative h-[360px] sm:h-[420px] md:h-[460px] w-full rounded-2xl overflow-hidden bg-bg-light border border-gray-100 flex items-center justify-center cursor-zoom-in group select-none shadow-sm"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          priority
                          className="object-contain p-6 transition-transform duration-250 ease-out"
                          style={
                            zoomStyle
                              ? { transform: "scale(1.6)", ...zoomStyle }
                              : { transform: "scale(1)" }
                          }
                        />
                        {!product.published ? (
                          <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md z-10 animate-pulse">
                            Coming Soon
                          </span>
                        ) : product.badge && (
                          <span className="absolute top-4 left-4 bg-accent text-primary text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md z-10">
                            {product.badge}
                          </span>
                        )}
                        <span className="absolute bottom-4 right-4 text-[10px] bg-white/70 hover:bg-white text-gray-500 px-2 py-1 rounded border border-gray-200 backdrop-blur-sm transition-all pointer-events-none">
                          Hover to Zoom
                        </span>
                      </div>
                    )}

                    {activeImage === 1 && (
                      <div className="relative h-[360px] sm:h-[420px] md:h-[460px] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 text-white font-mono p-6 flex flex-col justify-between hero-grid-pattern shadow-sm">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                        
                        <div className="flex justify-between items-start z-10 border-b border-white/10 pb-3">
                          <span className="text-xs md:text-sm text-sky-400 font-bold tracking-widest flex items-center gap-1.5">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                            TECHNICAL DIMENSION SCHEMATIC
                          </span>
                          <span className="text-[10px] md:text-xs text-white/40">SCALE: N.T.S</span>
                        </div>

                        {/* Technical drawing mockup */}
                        <div className="flex-1 flex items-center justify-center my-4 relative">
                          <div className="w-[85%] h-[75%] border border-dashed border-sky-500/40 rounded flex flex-col items-center justify-center p-4 bg-sky-500/5 relative">
                            {/* Horizontal dimension line */}
                            <div className="absolute -bottom-6 left-0 right-0 h-px bg-sky-500/80">
                              <div className="absolute left-0 -top-1.5 w-px h-4 bg-sky-500" />
                              <div className="absolute right-0 -top-1.5 w-px h-4 bg-sky-500" />
                              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 text-xs text-sky-400 font-semibold tracking-wider whitespace-nowrap">
                                {product.specs.find(s => s.label.toLowerCase().includes("dimension") || s.label.toLowerCase().includes("size"))?.value || "Standard Width"}
                              </div>
                            </div>

                            {/* Vertical dimension line */}
                            <div className="absolute -left-6 top-0 bottom-0 w-px bg-sky-500/80">
                              <div className="absolute top-0 -left-1.5 w-4 h-px bg-sky-500" />
                              <div className="absolute bottom-0 -left-1.5 w-4 h-px bg-sky-500" />
                              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-900 py-1.5 text-xs text-sky-400 font-semibold tracking-wider rotate-90 origin-center whitespace-nowrap">
                                {product.specs.find(s => s.label.toLowerCase().includes("height") || s.label.toLowerCase().includes("depth"))?.value || "Height Profile"}
                              </div>
                            </div>

                            <div className="w-14 h-14 rounded-full border border-sky-400/40 flex items-center justify-center text-sky-400 bg-sky-950/50 mb-3 shadow-inner">
                              <Settings className="w-7 h-7 animate-spin-slow" />
                            </div>
                            <span className="text-xs text-sky-300 font-semibold text-center truncate max-w-full px-2">{product.name}</span>
                            <span className="text-xs text-white/50 mt-1">WEIGHT: {product.specs.find(s => s.label.toLowerCase().includes("weight"))?.value || "Standard Weight"}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-white/60 border-t border-white/10 pt-3 z-10">
                          <div>TYPE: {product.specs[1]?.value || "Standard Model"}</div>
                          <div className="text-right">WARRANTY: {product.specs.find(s => s.label.toLowerCase().includes("warranty"))?.value || "Standard"}</div>
                        </div>
                      </div>
                    )}

                    {activeImage === 2 && (
                      <div className="relative h-[360px] sm:h-[420px] md:h-[460px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary-deeper to-primary border border-gray-200 p-6 flex flex-col justify-between text-white shadow-md">
                        <div className="absolute top-0 right-0 w-36 h-36 bg-accent/10 rounded-full blur-3xl" />
                        <div className="border-b border-white/10 pb-3 flex justify-between items-center z-10">
                          <span className="text-xs md:text-sm text-accent font-bold tracking-widest flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-accent" />
                            SKY ZONE QUALITY ASSURANCE
                          </span>
                          <span className="text-xs text-white/40">VERIFIED</span>
                        </div>

                        <div className="flex-1 flex flex-col justify-center my-4 space-y-3 z-10">
                          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                              <Check className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white uppercase">100% Quality Inspection</h4>
                              <p className="text-xs text-white/60">Fully audited for efficiency, safety parameters and structural load standards.</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                              <Check className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white uppercase">IEC & Certification Standard</h4>
                              <p className="text-xs text-white/60">All product components are verified by international agencies (IEC, CE, ISO).</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                              <Check className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white uppercase">Linear Performance Guarantee</h4>
                              <p className="text-xs text-white/60">Backed by Sky Zone International&apos;s authorized regional distributor service warranty.</p>
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-white/40 text-center border-t border-white/10 pt-3 z-10">
                          Secure Supply &middot; Authorized Bangladesh Importer & Distributor
                        </div>
                      </div>
                    )}

                    {activeImage === 3 && (
                      <div className="relative h-[360px] sm:h-[420px] md:h-[460px] w-full rounded-2xl overflow-hidden bg-bg-light border border-gray-200 p-6 flex flex-col justify-between text-text-dark shadow-sm">
                        <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
                          <span className="text-xs md:text-sm text-primary font-bold tracking-widest flex items-center gap-1.5">
                            <Box className="w-4 h-4 text-electric" />
                            CARGO & SHIPPING CONTENTS
                          </span>
                          <span className="text-xs text-gray-400">READY</span>
                        </div>

                        <div className="flex-1 flex flex-col justify-center my-4 space-y-4">
                          <p className="text-sm text-gray-500 leading-relaxed">
                            Each order is packed using industrial heavy-duty shockproof crating. Ready for transport to Chittagong, Dhaka, and nationwide.
                          </p>

                          <ul className="space-y-2 text-sm md:text-base text-gray-700">
                            <li className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-electric shrink-0 mt-2" />
                              <span><strong>1x</strong> {product.name} (Sealed Retail/Bulk Unit)</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-electric shrink-0 mt-2" />
                              <span><strong>1x</strong> Factory Datasheet & Wiring Guide</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-electric shrink-0 mt-2" />
                              <span><strong>1x</strong> Sky Zone Official Warranty Certificate</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-electric shrink-0 mt-2" />
                              <span>Essential connector kit / basic brackets (where applicable)</span>
                            </li>
                          </ul>
                        </div>

                        <div className="text-xs text-gray-400 text-center border-t border-gray-200 pt-3">
                          Transit Insurance &middot; Secure Packaging &middot; Safe Dispatch Guarantee
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Gallery View Tabs / Thumbnails */}
                  <div className="grid grid-cols-4 gap-2">
                    {galleryViews.map((view, i) => {
                      const Icon = view.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={cn(
                            "flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer",
                            activeImage === i
                              ? "bg-primary border-primary text-white shadow-md"
                              : "bg-bg-light border-gray-200 hover:border-accent text-gray-500 hover:text-text-dark hover:bg-white"
                          )}
                        >
                          <Icon className="w-4 h-4 mb-1 shrink-0" />
                          <span className="text-[11px] md:text-xs font-bold tracking-tight uppercase line-clamp-1">{view.label}</span>
                        </button>
                      );
                    })}
                  </div>

                </div>
              </ScrollReveal>
            </div>

            {/* Right: Info, Pricing & Quick Highlights (Grid Span 7) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <ScrollReveal direction="right">
                <div>
                  
                  {/* Category Badge & Badge Tag */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex bg-primary/5 border border-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {product.category}
                    </span>
                    {product.brand && (
                      <span className="inline-flex bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {product.brand}
                      </span>
                    )}
                    {product.series && (
                      <span className="inline-flex bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {product.series}
                      </span>
                    )}
                    {!product.published ? (
                      <span className="inline-flex bg-amber-500 border border-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                        Coming Soon
                      </span>
                    ) : product.badge && (
                      <span className="inline-flex bg-accent/20 border border-accent/20 text-accent-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Product Title */}
                  <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-heading font-bold text-text-dark leading-tight mt-4">
                    {product.name}
                  </h1>

                  {/* Pricing Range Tag */}
                  <div className="mt-4 flex flex-wrap items-baseline gap-2 pb-5 border-b border-gray-100">
                    <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-semibold">Pricing Status:</span>
                    <span className="text-2xl md:text-3xl font-bold text-electric">{product.priceRange || "Contact for Price"}</span>
                    <span className="text-xs md:text-sm text-gray-400 italic font-medium">(B2B wholesale pricing available)</span>
                  </div>

                  {/* Main Description */}
                  <p className="text-base md:text-lg text-gray-600 mt-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Quick Specs Highlight Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                    {product.specs.slice(0, 3).map((spec) => (
                      <div key={spec.label} className="bg-bg-light border border-gray-200/60 p-4 rounded-xl">
                        <span className="block text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">{spec.label}</span>
                        <span className="block text-base md:text-lg font-semibold text-text-dark mt-1">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Value Props checklist */}
                  <div className="mt-8 space-y-3 bg-accent/5 border border-accent/10 rounded-2xl p-5">
                    <h4 className="text-base font-bold text-primary uppercase tracking-wider mb-3">Distributor Advantages:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base text-gray-700">
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-accent shrink-0" />
                        <span className="font-medium">Direct Import Pricing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-accent shrink-0" />
                        <span className="font-medium">National Warranty Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-accent shrink-0" />
                        <span className="font-medium">Complete Technical Spares</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-accent shrink-0" />
                        <span className="font-medium">Engineering Project Support</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={scrollToInquiry}
                      icon={<Mail className="w-4 h-4" />}
                      className="w-full justify-center"
                    >
                      Inquire Price & Availability
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={scrollToInquiry}
                      icon={<FileText className="w-4 h-4" />}
                      className="w-full justify-center"
                    >
                      Get Technical Quote
                    </Button>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>
      </section>

      {/* Tabs Section: Specs & Features */}
      <section className="py-16 md:py-20 bg-bg-light border-y border-gray-200/50">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Tabs content column (Grid Span 8) */}
            <div className="lg:col-span-8">
              
              {/* Tabs buttons header */}
              <div className="flex border-b border-gray-200 mb-6 gap-8">
                <button
                  onClick={() => setActiveTab("specs")}
                  className={cn(
                    "pb-3.5 text-base md:text-lg font-bold uppercase tracking-wider relative transition-all cursor-pointer",
                    activeTab === "specs" ? "text-primary font-bold" : "text-gray-400 hover:text-text-dark"
                  )}
                >
                  Technical Specifications
                  {activeTab === "specs" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-fade-in" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("features")}
                  className={cn(
                    "pb-3.5 text-base md:text-lg font-bold uppercase tracking-wider relative transition-all cursor-pointer",
                    activeTab === "features" ? "text-primary font-bold" : "text-gray-400 hover:text-text-dark"
                  )}
                >
                  Features & Benefits
                  {activeTab === "features" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-fade-in" />
                  )}
                </button>
              </div>

              {/* Tab Panel: Specs */}
              {activeTab === "specs" && (
                <ScrollReveal>
                  <div>
                    {/* Live specification search */}
                    <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl border border-gray-200 mb-4 max-w-sm">
                      <Search className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="text"
                        placeholder="Search specifications..."
                        value={specQuery}
                        onChange={(e) => setSpecQuery(e.target.value)}
                        className="bg-transparent border-none text-sm outline-none text-text-dark w-full placeholder:text-gray-400"
                      />
                      {specQuery && (
                        <button onClick={() => setSpecQuery("")} className="shrink-0 text-gray-400 hover:text-text-dark">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Specs Table */}
                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm">
                      {filteredSpecs.length > 0 ? (
                        <div className="divide-y divide-gray-100">
                          {filteredSpecs.map((spec, i) => (
                            <div
                              key={spec.label}
                              className={cn(
                                "flex flex-col sm:flex-row justify-between py-4 px-6 text-sm transition-colors",
                                i % 2 === 0 ? "bg-bg-light/30" : "bg-white",
                                "hover:bg-accent/5"
                              )}
                            >
                              <span className="font-bold text-text-dark uppercase tracking-wider text-sm sm:w-[40%]">{spec.label}</span>
                              <span className="text-gray-600 font-medium sm:w-[60%] sm:pl-4 mt-1.5 sm:mt-0 leading-relaxed md:text-base">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center text-gray-400 text-sm">
                          No specifications match &ldquo;{specQuery}&rdquo;
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Tab Panel: Features */}
              {activeTab === "features" && (
                <ScrollReveal>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex gap-4 bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm group hover:border-electric/30 transition-all">
                        <div className="w-10 h-10 rounded-full bg-electric/10 flex items-center justify-center text-electric shrink-0 group-hover:bg-electric group-hover:text-white transition-all">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-base md:text-lg font-semibold text-text-dark leading-snug">{feature}</p>
                          <p className="text-sm text-gray-500 mt-2 leading-relaxed">Engineered for maximum endurance under severe electrical load.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}

            </div>

            {/* Side B2B QA Information (Grid Span 4) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm self-start">
              <h4 className="font-heading font-bold text-lg text-text-dark uppercase tracking-wider border-b border-gray-100 pb-3 mb-4">
                Datasheet Downloads
              </h4>
              <p className="text-sm md:text-base text-gray-500 mb-5">
                Access official technical sheets, product drawings, and certifications.
              </p>
              
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center justify-between p-4 rounded-xl bg-bg-light border border-gray-100 hover:border-electric/30 text-sm md:text-base font-semibold text-text-dark group transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-red-500" />
                    Technical Datasheet (PDF)
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 group-hover:text-electric transition-all" />
                </a>
                
                <a
                  href="#"
                  className="flex items-center justify-between p-4 rounded-xl bg-bg-light border border-gray-100 hover:border-electric/30 text-sm md:text-base font-semibold text-text-dark group transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4 text-blue-500" />
                    Installation Guide (PDF)
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 group-hover:text-electric transition-all" />
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="font-heading font-bold text-base text-text-dark uppercase tracking-wider mb-3">
                  Quick Inquiry Tips
                </h4>
                <ul className="text-sm md:text-base text-gray-500 space-y-3">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 bg-accent rounded-full shrink-0 mt-2" />
                    <span>Include estimated order quantity for accurate quotation discounts.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 bg-accent rounded-full shrink-0 mt-2" />
                    <span>Mention custom installation conditions (on-grid, coastal location, etc.).</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Product Inquiry Form Section */}
      <section id="inquiry-form-section" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="bg-primary-deeper text-white rounded-3xl overflow-hidden shadow-2xl border border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Inquiry Guidelines (Grid Span 5) */}
              <div className="lg:col-span-5 p-8 md:p-12 bg-primary flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
                <div>
                  <span className="text-sm md:text-base text-accent font-bold tracking-widest uppercase">
                    B2B Direct Channel
                  </span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 text-white leading-tight">
                    Submit Inquiry for {product.name}
                  </h3>
                  <p className="text-base md:text-lg text-white/80 mt-6 leading-relaxed">
                    Sky Zone International delivers wholesale energy equipment and customized solutions nationwide. Fill out the request and our commercial sales desk will get back to you within 24 hours.
                  </p>
                </div>

                <div className="mt-10 lg:mt-0 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0">
                      <Building className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white uppercase tracking-wider">Wholesale Orders Only</h4>
                      <p className="text-sm text-white/60 mt-0.5">Minimum quantities apply for dealer pricing benefits.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white uppercase tracking-wider">Direct Support Hotlines</h4>
                      <p className="text-sm text-white/60 mt-0.5">+880 1XXX-XXXXXX (Commercial Desk)</p>
                    </div>
                  </div>
                </div>

                <div className="text-sm md:text-base text-white/40 mt-8 lg:mt-0">
                  Sky Zone International &middot; Shamshuddin Tower, Chittagong
                </div>
              </div>

              {/* Right Column: Interactive Form (Grid Span 7) */}
              <div className="lg:col-span-7 p-8 md:p-12 bg-white/5 backdrop-blur-md relative">
                
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    
                    // The Inquiry Form
                    <motion.form
                      key="inquiry-form"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleInquirySubmit}
                      className="space-y-5 text-text-dark"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name Input */}
                        <div>
                          <label className="block text-sm md:text-base font-semibold text-white/90 uppercase tracking-wider mb-2.5">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={cn(
                              "w-full bg-white/5 border text-white rounded-xl px-4.5 py-3.5 text-base focus:outline-none focus:bg-white/10 transition-all",
                              errors.name ? "border-red-400" : "border-white/10 focus:border-accent"
                            )}
                            placeholder="John Doe"
                          />
                          {errors.name && (
                            <span className="text-xs text-red-400 font-semibold mt-1.5 block">{errors.name}</span>
                          )}
                        </div>

                        {/* Company Input */}
                        <div>
                          <label className="block text-sm md:text-base font-semibold text-white/90 uppercase tracking-wider mb-2.5">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4.5 py-3.5 text-base focus:outline-none focus:bg-white/10 focus:border-accent transition-all"
                            placeholder="Energy Tech Ltd."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Email Input */}
                        <div>
                          <label className="block text-sm md:text-base font-semibold text-white/90 uppercase tracking-wider mb-2.5">
                            Work Email <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={cn(
                              "w-full bg-white/5 border text-white rounded-xl px-4.5 py-3.5 text-base focus:outline-none focus:bg-white/10 transition-all",
                              errors.email ? "border-red-400" : "border-white/10 focus:border-accent"
                            )}
                            placeholder="john@company.com"
                          />
                          {errors.email && (
                            <span className="text-xs text-red-400 font-semibold mt-1.5 block">{errors.email}</span>
                          )}
                        </div>

                        {/* Phone Input */}
                        <div>
                          <label className="block text-sm md:text-base font-semibold text-white/90 uppercase tracking-wider mb-2.5">
                            Phone Number <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={cn(
                              "w-full bg-white/5 border text-white rounded-xl px-4.5 py-3.5 text-base focus:outline-none focus:bg-white/10 transition-all",
                              errors.phone ? "border-red-400" : "border-white/10 focus:border-accent"
                            )}
                            placeholder="+880 1712-345678"
                          />
                          {errors.phone && (
                            <span className="text-xs text-red-400 font-semibold mt-1.5 block">{errors.phone}</span>
                          )}
                        </div>
                      </div>

                      {/* Message Input */}
                      <div>
                        <label className="block text-sm md:text-base font-semibold text-white/90 uppercase tracking-wider mb-2.5">
                          Inquiry details / Message
                        </label>
                        <textarea
                          rows={5}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4.5 py-3.5 text-base focus:outline-none focus:bg-white/10 focus:border-accent transition-all resize-none"
                          placeholder="Provide estimated quantities, configurations, shipping instructions..."
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full justify-center"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Processing Inquiry...
                            </>
                          ) : (
                            <>
                              Submit Official Request
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </Button>
                      </div>

                    </motion.form>
                  ) : (
                    
                    // Success Message Animation Card
                    <motion.div
                      key="success-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="h-full flex flex-col items-center justify-center text-center py-10"
                    >
                      <div className="w-16 h-16 bg-accent/20 border border-accent/20 text-accent rounded-full flex items-center justify-center shadow-lg mb-6 animate-bounce">
                        <Check className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">Inquiry Received Successfully!</h3>
                      <p className="text-sm md:text-base text-white/70 mt-3 max-w-md">
                        Thank you for contacting Sky Zone International. Your request regarding <strong>{product.name}</strong> is in our queue.
                      </p>
                      <p className="text-sm text-white/50 mt-2">
                        A verification email was sent to your address. Our commercial sales representatives will connect with you within 24 hours.
                      </p>
                      
                      <Button
                        onClick={() => setIsSuccess(false)}
                        variant="secondary"
                        size="sm"
                        className="mt-8"
                      >
                        Submit Another Inquiry
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>
          </div>

          {/* Back button */}
          <div className="mt-12 flex justify-start">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-electric hover:text-electric-light transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to All Products
            </Link>
          </div>

        </div>
      </section>

       {/* Redesigned Related Products */}
       {relatedProducts.length > 0 && (
         <section className="py-16 md:py-24 bg-bg-light border-t border-gray-200/50">
           <div className="max-w-[1200px] mx-auto px-5">
             <SectionHeader label="Related" title="Related Products" />
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
               {relatedProducts.map((rp) => (
                 <ScrollReveal key={rp.id}>
                   <Link
                     href={`/products/${rp.slug}`}
                     className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group border border-gray-100"
                   >
                     <div className="relative h-[180px] overflow-hidden bg-bg-light">
                       <Image
                         src={rp.image}
                         alt={rp.name}
                         fill
                         className="object-cover group-hover:scale-105 transition-transform duration-500"
                       />
                       <span className="absolute top-3 right-3 bg-primary/70 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                         {rp.category}
                       </span>
                     </div>
                     <div className="p-6 flex flex-col justify-between min-h-[140px]">
                       <div>
                         <h4 className="font-heading font-bold text-base md:text-lg text-text-dark group-hover:text-electric transition-colors line-clamp-1">
                           {rp.name}
                         </h4>
                         <span className="text-xs md:text-sm font-semibold text-gray-400 mt-2 block uppercase tracking-wider">{rp.specs[0]?.label}: {rp.specs[0]?.value}</span>
                       </div>
                       <span className="text-electric font-semibold text-sm md:text-base flex items-center gap-1 mt-4 group-hover:gap-1.5 transition-all">
                         View Details <ArrowRight className="w-3.5 h-3.5" />
                       </span>
                     </div>
                   </Link>
                 </ScrollReveal>
               ))}
             </div>
           </div>
         </section>
       )}
    </>
  );
}
