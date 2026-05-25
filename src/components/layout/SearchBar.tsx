"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, History, Zap, Sparkles, Folder } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products, productCategories } from "@/data/products";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      const saved = localStorage.getItem("sz_recent_searches");
      if (saved) {
        try {
          setRecentSearches(JSON.parse(saved));
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }, [isOpen]);

  // Focus input on open, handle overflow
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Save search query to localStorage
  const saveSearchTerm = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const updated = [
      trimmed,
      ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase()),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("sz_recent_searches", JSON.stringify(updated));
  };

  // Clear recent searches
  const clearRecentSearches = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem("sz_recent_searches");
  };

  // Execute the search
  const executeSearch = (searchTerm: string) => {
    const trimmed = searchTerm.trim();
    if (trimmed.length > 0) {
      saveSearchTerm(trimmed);
      router.push(`/products?search=${encodeURIComponent(trimmed)}`);
      onClose();
    }
  };

  // Submit search form
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  // Click suggestion/recent search
  const handleTermClick = (term: string) => {
    saveSearchTerm(term);
    router.push(`/products?search=${encodeURIComponent(term)}`);
    onClose();
  };

  // Calculate product results
  const filteredProducts = query.trim().length >= 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  // Calculate matching categories
  const matchedCategories = query.trim().length >= 1
    ? productCategories.filter(
        (cat) =>
          cat.slug !== "future-products" &&
          cat.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  const popularSuggestions = [
    "Argon Series",
    "Zapher Series",
    "Inverter",
    "Lithium Battery",
    "Solar Pump VFD",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-primary-deeper/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Search Card Panel */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-[80] pt-6 px-4 md:pt-12"
          >
            <div className="max-w-[760px] mx-auto">
              <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-gray-100">
                
                {/* Search Bar Input Header */}
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                  <Search className="w-5 h-5 text-gray-400 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products, specifications, categories..."
                    className="flex-1 text-text-dark text-lg outline-none placeholder:text-gray-400 bg-transparent py-0.5"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="w-7 h-7 rounded-full bg-bg-light flex items-center justify-center text-gray-400 hover:text-text-dark hover:bg-gray-200 transition-all shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs text-gray-400 bg-bg-light px-2.5 py-1.5 rounded-lg font-medium hover:bg-gray-200 hover:text-text-dark transition-all shrink-0 uppercase tracking-wider"
                  >
                    Esc
                  </button>
                </form>

                {/* Dropdown Content Area */}
                <div className="max-h-[65vh] overflow-y-auto custom-scrollbar">
                  {query.trim().length === 0 ? (
                    // Initial State: Suggestions & Recents
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left: Recent Searches */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                            <History className="w-3.5 h-3.5" />
                            Recent Searches
                          </h4>
                          {recentSearches.length > 0 && (
                            <button
                              onClick={clearRecentSearches}
                              className="text-[11px] font-semibold text-electric hover:text-electric-light transition-colors"
                            >
                              Clear All
                            </button>
                          )}
                        </div>
                        {recentSearches.length > 0 ? (
                          <div className="space-y-1">
                            {recentSearches.map((term, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleTermClick(term)}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-dark hover:bg-bg-light rounded-lg transition-all text-left group"
                              >
                                <History className="w-4 h-4 text-gray-300 group-hover:text-electric" />
                                <span className="flex-1 truncate">{term}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400 italic py-2 pl-3">
                            No recent searches
                          </p>
                        )}
                      </div>

                      {/* Right: Popular Searches & Categories */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-4">
                          <Sparkles className="w-3.5 h-3.5 text-accent" />
                          Popular Searches
                        </h4>
                        <div className="space-y-1 mb-6">
                          {popularSuggestions.map((term, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleTermClick(term)}
                              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-dark hover:bg-bg-light rounded-lg transition-all text-left group"
                            >
                              <Zap className="w-4 h-4 text-gray-300 group-hover:text-accent" />
                              <span>{term}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ml-auto" />
                            </button>
                          ))}
                        </div>

                        {/* Popular Categories Links */}
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                          <Folder className="w-3.5 h-3.5" />
                          Quick Categories
                        </h4>
                        <div className="flex flex-wrap gap-2 px-1">
                          {productCategories
                            .filter((c) => c.slug !== "future-products")
                            .slice(0, 4)
                            .map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/products?category=${cat.slug}`}
                                onClick={onClose}
                                className="text-xs bg-bg-light hover:bg-primary hover:text-white text-text-dark px-3 py-1.5 rounded-full transition-all border border-gray-100 font-medium"
                              >
                                {cat.name}
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Typing state: Dynamic Results
                    <div className="p-4">
                      
                      {/* Matching Categories */}
                      {matchedCategories.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
                            Suggested Categories
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 px-1">
                            {matchedCategories.map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/products?category=${cat.slug}`}
                                onClick={onClose}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-bg-light/50 hover:bg-electric/10 hover:text-electric transition-all text-sm font-medium text-text-dark group border border-transparent hover:border-electric/15"
                              >
                                <Folder className="w-4 h-4 text-gray-400 group-hover:text-electric" />
                                <span>{cat.name}</span>
                                <span className="text-[10px] text-gray-400 font-normal ml-auto">
                                  {cat.productCount} Products
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Product Results */}
                      <div>
                        <div className="flex items-center justify-between px-3 mb-2">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Product Matches
                          </h4>
                          {filteredProducts.length > 0 && (
                            <span className="text-[10px] bg-primary/5 text-primary font-bold px-2 py-0.5 rounded">
                              {filteredProducts.length} Match{filteredProducts.length !== 1 ? "es" : ""}
                            </span>
                          )}
                        </div>

                        {filteredProducts.length > 0 ? (
                          <div className="space-y-1">
                            {filteredProducts.map((product) => (
                              <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                onClick={() => {
                                  saveSearchTerm(product.name);
                                  onClose();
                                }}
                                className="flex items-center gap-4 px-3 py-2.5 rounded-xl hover:bg-bg-light transition-all group border border-transparent hover:border-gray-100"
                              >
                                <div className="w-12 h-12 rounded-lg bg-bg-light overflow-hidden shrink-0 relative border border-gray-100">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-text-dark group-hover:text-electric transition-colors truncate">
                                    {product.name}
                                  </p>
                                  <p className="text-xs text-gray-400 truncate mt-0.5">
                                    {product.category} &bull; {product.shortDescription}
                                  </p>
                                </div>
                                {product.badge && (
                                  <span className="text-[9px] font-bold text-primary bg-accent/20 px-2 py-0.5 rounded-full shrink-0">
                                    {product.badge}
                                  </span>
                                )}
                                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-electric transition-colors shrink-0" />
                              </Link>
                            ))}

                            {/* View All Search Results Form Trigger */}
                            <button
                              type="button"
                              onClick={() => executeSearch(query)}
                              className="w-full flex items-center justify-center gap-2 px-3 py-3 mt-3 text-sm text-white bg-primary hover:bg-primary-dark font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
                            >
                              Search All Products for &ldquo;{query}&rdquo;
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="py-12 text-center bg-bg-light/30 rounded-xl border border-dashed border-gray-200">
                            <p className="text-gray-500 text-sm font-medium">
                              No products found for &ldquo;{query}&rdquo;
                            </p>
                            <p className="text-gray-400 text-xs mt-1 px-4">
                              Check spelling or try search terms like &quot;solar&quot;, &quot;battery&quot;, or &quot;inverter&quot;
                            </p>
                          </div>
                        )}
                      </div>

                    </div>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
