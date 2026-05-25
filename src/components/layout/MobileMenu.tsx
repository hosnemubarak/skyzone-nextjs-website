"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Phone, Mail, Search } from "lucide-react";
import { navigation, companyInfo } from "@/data/navigation";
import SocialIcon from "@/components/ui/SocialIcon";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/products?search=${encodeURIComponent(trimmed)}`);
      onClose();
      setSearchQuery("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[60] bg-primary-deeper/98 backdrop-blur-lg"
        >
          <div className="h-full flex flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 h-[72px] border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 flex items-center justify-center bg-white rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src="/images/logo.png"
                    alt="Sky Zone International Logo"
                    width={44}
                    height={44}
                    className="w-full h-full object-contain"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
                <span className="font-heading font-bold text-lg text-white">
                  Sky Zone <span className="text-accent">International</span>
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-white hover:text-accent transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Search Bar */}
            <div className="px-5 pt-4 pb-2 border-b border-white/5">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-white placeholder:text-white/40 focus:outline-none focus:border-accent/40 text-sm transition-all"
                />
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-white/40" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-3 w-5 h-5 flex items-center justify-center text-white/40 hover:text-white bg-white/10 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </form>
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto px-5 py-6">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  {item.children ? (
                    <div className="border-b border-white/10">
                      <button
                        onClick={() => setProductsOpen(!productsOpen)}
                        className="w-full flex items-center justify-between py-4 text-xl font-heading text-white"
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            productsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {productsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 space-y-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={onClose}
                                  className="block pl-6 py-2.5 text-base text-white/70 hover:text-accent transition-colors"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block py-4 text-xl font-heading text-white border-b border-white/10 hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Bottom info */}
            <div className="px-5 py-6 border-t border-white/10">
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-3 text-white/60 hover:text-accent text-sm mb-2 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>{companyInfo.phone}</span>
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-3 text-white/60 hover:text-accent text-sm mb-4 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>{companyInfo.email}</span>
              </a>
              <div className="flex gap-3">
                {(["facebook", "linkedin", "youtube"] as const).map((type) => (
                  <a
                    key={type}
                    href={companyInfo.social[type === "youtube" ? "youtube" : type]}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-accent hover:text-primary transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon type={type} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
