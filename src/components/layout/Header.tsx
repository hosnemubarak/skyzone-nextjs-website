"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Search, Sun, Zap, Battery, Power, Gauge, Cable, Wrench, Rocket, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation } from "@/data/navigation";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";

const iconMap: Record<string, React.ElementType> = {
  Sun, Zap, Battery, Power, Gauge, Cable, Wrench, Rocket,
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[72px]",
          scrolled
            ? "bg-primary/95 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-5 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-lg overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Sky Zone International Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </div>
            <span className="font-heading font-bold text-xl text-white tracking-tight">
              Sky Zone <span className="text-accent transition-colors group-hover:text-accent-dark">International</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.label} className="mega-menu-trigger relative">
                  <button
                    className={cn(
                      "flex items-center gap-1 text-[0.92rem] font-medium transition-all py-6",
                      pathname.startsWith("/products")
                        ? "text-accent"
                        : "text-white/80 hover:text-accent"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <div className="mega-menu absolute top-full left-1/2 -translate-x-1/2 pt-2">
                    <div className="bg-white rounded-xl shadow-2xl p-6 grid grid-cols-5 gap-3.5 min-w-[880px]">
                      {item.children.map((child) => {
                        const IconComp = iconMap[child.icon || "Sun"] || Sun;
                        return (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-bg-light transition-all group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                              <IconComp className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                            </div>
                            <div>
                              <span className="font-medium text-sm text-text-dark block">
                                {child.label}
                              </span>
                              <span className="text-xs text-gray-500">
                                {child.description}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "text-[0.92rem] font-medium transition-all relative py-6",
                    pathname === item.href
                      ? "text-accent"
                      : "text-white/80 hover:text-accent"
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute bottom-4 left-0 right-0 h-0.5 bg-accent rounded-full" />
                  )}
                </Link>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-accent transition-colors rounded-full hover:bg-white/10"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/contact"
              className="hidden lg:inline-flex bg-accent text-primary font-bold px-5 py-2.5 rounded-full hover:bg-accent-dark transition-all text-sm hover:-translate-y-0.5"
            >
              Get a Quote
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
