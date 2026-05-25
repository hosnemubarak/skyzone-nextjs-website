"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowRight, Search, X, SlidersHorizontal, RotateCcw, ChevronDown, Check, Info } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { products, productCategories } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Sync search & category slug from URL
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "all";

  // 2. Filter states
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [selectedInverterTypes, setSelectedInverterTypes] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"name-asc" | "name-desc">("name-asc");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync category param if URL changes
  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  // List of unique series from the dataset
  const availableSeriesList = useMemo(() => {
    const seriesSet = new Set<string>();
    products.forEach((p) => {
      if (p.series) seriesSet.add(p.series);
    });
    return Array.from(seriesSet).sort();
  }, []);

  // Sync state filters with URL query params on initial mount
  useEffect(() => {
    const types = searchParams.get("types")?.split(",") || [];
    const series = searchParams.get("series")?.split(",") || [];
    const statuses = searchParams.get("status")?.split(",") || [];
    const sort = searchParams.get("sort") as "name-asc" | "name-desc" || "name-asc";

    if (types.some(t => t)) setSelectedInverterTypes(types);
    if (series.some(s => s)) setSelectedSeries(series);
    if (statuses.some(st => st)) setSelectedStatuses(statuses);
    setSortOrder(sort);
  }, [searchParams]);

  // Update URL search parameters when filters change
  const updateURL = (
    category: string,
    types: string[],
    series: string[],
    statuses: string[],
    sort: string
  ) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (category !== "all") params.set("category", category);
    if (types.length > 0) params.set("types", types.join(","));
    if (series.length > 0) params.set("series", series.join(","));
    if (statuses.length > 0) params.set("status", statuses.join(","));
    if (sort !== "name-asc") params.set("sort", sort);

    router.push(`/products?${params.toString()}`);
  };

  const handleCategoryClick = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    // Reset inverter specific filters when changing to a non-inverter category
    const newTypes = categorySlug !== "all" && categorySlug !== "inverter" ? [] : selectedInverterTypes;
    setSelectedInverterTypes(newTypes);
    updateURL(categorySlug, newTypes, selectedSeries, selectedStatuses, sortOrder);
  };

  const toggleInverterType = (type: string) => {
    const updated = selectedInverterTypes.includes(type)
      ? selectedInverterTypes.filter((t) => t !== type)
      : [...selectedInverterTypes, type];
    setSelectedInverterTypes(updated);
    updateURL(activeCategory, updated, selectedSeries, selectedStatuses, sortOrder);
  };

  const toggleSeries = (seriesName: string) => {
    const updated = selectedSeries.includes(seriesName)
      ? selectedSeries.filter((s) => s !== seriesName)
      : [...selectedSeries, seriesName];
    setSelectedSeries(updated);
    updateURL(activeCategory, selectedInverterTypes, updated, selectedStatuses, sortOrder);
  };

  const toggleStatus = (status: string) => {
    const updated = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    setSelectedStatuses(updated);
    updateURL(activeCategory, selectedInverterTypes, selectedSeries, updated, sortOrder);
  };

  const handleSortChange = (order: "name-asc" | "name-desc") => {
    setSortOrder(order);
    updateURL(activeCategory, selectedInverterTypes, selectedSeries, selectedStatuses, order);
  };

  const resetAllFilters = () => {
    setActiveCategory("all");
    setSelectedInverterTypes([]);
    setSelectedSeries([]);
    setSelectedStatuses([]);
    setSortOrder("name-asc");
    
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    router.push(`/products?${params.toString()}`);
  };

  // Compile final filtered & sorted products list
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // A. Main Category Filter
    if (activeCategory !== "all") {
      list = list.filter((p) => p.categorySlug === activeCategory);
    }

    // B. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.series && p.series.toLowerCase().includes(q)) ||
          p.specs.some(
            (spec) =>
              spec.label.toLowerCase().includes(q) ||
              spec.value.toLowerCase().includes(q)
          )
      );
    }

    // C. Inverter Type Filter (Applicable only for Inverter or All categories)
    if (selectedInverterTypes.length > 0 && (activeCategory === "all" || activeCategory === "inverter")) {
      list = list.filter((p) => p.inverterType && selectedInverterTypes.includes(p.inverterType));
    }

    // D. Series Filter
    if (selectedSeries.length > 0) {
      list = list.filter((p) => p.series && selectedSeries.includes(p.series));
    }

    // E. Status Filter
    if (selectedStatuses.length > 0) {
      list = list.filter((p) => {
        const isAvailableSelected = selectedStatuses.includes("available");
        const isComingSoonSelected = selectedStatuses.includes("coming-soon");

        if (isAvailableSelected && isComingSoonSelected) return true;
        if (isAvailableSelected) return p.published === true;
        if (isComingSoonSelected) return p.published === false;
        return true;
      });
    }

    // F. Alphabetical Sorting (Name A-Z / Name Z-A)
    list.sort((a, b) => {
      if (sortOrder === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [activeCategory, searchQuery, selectedInverterTypes, selectedSeries, selectedStatuses, sortOrder]);

  const activeFiltersCount =
    (activeCategory !== "all" ? 1 : 0) +
    selectedInverterTypes.length +
    selectedSeries.length +
    selectedStatuses.length;

  return (
    <>
      {/* Page Hero */}
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Products</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Our Products
          </h1>
          <p className="text-lg text-white/70 mt-4 max-w-2xl">
            Explore our comprehensive range of solar panels, inverters, batteries, and electrical equipment from globally trusted brands.
          </p>
        </div>
      </section>

      {/* Category Tab Bar (Main Nav) */}
      <section className="py-4 bg-white sticky top-[72px] z-30 border-b border-gray-100 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryClick("all")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-bg-light text-text-dark hover:bg-primary/10"
                }`}
              >
                All Products
              </button>
              {productCategories
                .filter((c) => c.slug !== "future-products")
                .map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryClick(cat.slug)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                      activeCategory === cat.slug
                        ? "bg-primary text-white shadow-sm"
                        : "bg-bg-light text-text-dark hover:bg-primary/10"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-accent" />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid View */}
      <section className="py-12 bg-bg-light min-h-[600px]">
        <div className="max-w-[1200px] mx-auto px-5">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* A. Sticky Sidebar Filters Panel (Desktop Only) */}
            <aside className="hidden lg:block lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-150 p-6 sticky top-[160px] max-h-[80vh] overflow-y-auto custom-scrollbar shadow-sm">
                
                {/* Header filter title */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                  <h3 className="font-heading font-bold text-text-dark text-base flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-primary" />
                    Filter Products
                  </h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={resetAllFilters}
                      className="text-xs font-semibold text-electric hover:text-electric-light transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  )}
                </div>

                {/* Group 1: Inverter Type Sub-filter */}
                {(activeCategory === "all" || activeCategory === "inverter") && (
                  <div className="border-b border-gray-100 pb-5 mb-5">
                    <h4 className="font-heading font-bold text-xs text-gray-400 uppercase tracking-widest mb-3">
                      Inverter Type
                    </h4>
                    <div className="space-y-2.5">
                      {[
                        { label: "Hybrid Inverter", value: "hybrid" },
                        { label: "On-Grid Inverter", value: "on-grid" },
                        { label: "Off-Grid Inverter", value: "off-grid" },
                      ].map((item) => (
                        <label
                          key={item.value}
                          className="flex items-center gap-3 text-sm text-text-dark cursor-pointer group"
                        >
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedInverterTypes.includes(item.value)}
                              onChange={() => toggleInverterType(item.value)}
                              className="sr-only peer"
                            />
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-md bg-white peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 text-accent opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                          </div>
                          <span className="group-hover:text-primary transition-colors text-sm font-medium">
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Group 2: Brand/Series Sub-filter */}
                <div className="border-b border-gray-100 pb-5 mb-5">
                  <h4 className="font-heading font-bold text-xs text-gray-400 uppercase tracking-widest mb-3">
                    Brand Series
                  </h4>
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {availableSeriesList.map((seriesName) => (
                      <label
                        key={seriesName}
                        className="flex items-center gap-3 text-sm text-text-dark cursor-pointer group"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedSeries.includes(seriesName)}
                            onChange={() => toggleSeries(seriesName)}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-md bg-white peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-accent opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <span className="group-hover:text-primary transition-colors text-sm font-medium">
                          {seriesName} Series
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Group 3: Status Sub-filter */}
                <div>
                  <h4 className="font-heading font-bold text-xs text-gray-400 uppercase tracking-widest mb-3">
                    Status
                  </h4>
                  <div className="space-y-2.5">
                    {[
                      { label: "Available Now", value: "available" },
                      { label: "Coming Soon", value: "coming-soon" },
                    ].map((item) => (
                      <label
                        key={item.value}
                        className="flex items-center gap-3 text-sm text-text-dark cursor-pointer group"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedStatuses.includes(item.value)}
                            onChange={() => toggleStatus(item.value)}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-md bg-white peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-accent opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <span className="group-hover:text-primary transition-colors text-sm font-medium">
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            </aside>

            {/* B. Products Content Area */}
            <main className="lg:col-span-3">
              
              {/* Product Header / Sort Panel */}
              <div className="bg-white rounded-2xl border border-gray-150 p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                
                {/* Result summary indicator */}
                <div>
                  <p className="text-gray-500 text-sm">
                    Showing <span className="font-bold text-text-dark">{filteredProducts.length}</span> products
                    {searchQuery && (
                      <>
                        {" "}for &ldquo;<span className="text-primary font-semibold">{searchQuery}</span>&rdquo;
                      </>
                    )}
                    {activeCategory !== "all" && (
                      <>
                        {" "}in <span className="text-primary font-semibold">{productCategories.find(c => c.slug === activeCategory)?.name}</span>
                      </>
                    )}
                  </p>
                  {activeFiltersCount > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="text-[10px] bg-primary/5 text-primary border border-primary/10 font-bold px-2 py-0.5 rounded-md">
                        {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""} active
                      </span>
                    </div>
                  )}
                </div>

                {/* Sort order select dropdown & resets */}
                <div className="flex items-center gap-3">
                  {searchQuery && (
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      Clear Search
                    </Link>
                  )}
                  
                  <div className="relative inline-flex items-center bg-bg-light border border-gray-200 rounded-xl px-3 py-2 cursor-pointer group">
                    <span className="text-xs text-gray-500 font-semibold mr-2 shrink-0">Sort By:</span>
                    <select
                      value={sortOrder}
                      onChange={(e) => handleSortChange(e.target.value as any)}
                      className="bg-transparent text-xs font-bold text-text-dark border-none outline-none pr-6 cursor-pointer focus:ring-0 appearance-none font-sans"
                    >
                      <option value="name-asc">Name (A - Z)</option>
                      <option value="name-desc">Name (Z - A)</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-text-dark absolute right-3 pointer-events-none group-hover:text-primary transition-colors" />
                  </div>
                </div>

              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => (
                  <ScrollReveal key={product.id} delay={i * 0.05}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="block bg-white rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group h-full border border-gray-150/40"
                    >
                      <div className="relative h-[220px] overflow-hidden bg-bg-light border-b border-gray-100 flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {!product.published ? (
                          <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-10 animate-pulse uppercase tracking-wider">
                            Coming Soon
                          </span>
                        ) : product.badge && (
                          <span className="absolute top-3 left-3 bg-accent text-primary text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                            {product.badge}
                          </span>
                        )}
                        <span className="absolute top-3 right-3 bg-primary/80 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>
                      <div className="p-5 flex flex-col justify-between">
                        <div>
                          <h3 className="font-heading font-bold text-lg text-text-dark group-hover:text-electric transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                            {product.shortDescription}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {product.specs.slice(0, 3).map((spec) => (
                              <span
                                key={spec.label}
                                className="text-[10px] bg-bg-light text-gray-500 px-2 py-1 rounded font-semibold border border-gray-200/60"
                              >
                                {spec.label}: {spec.value}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                          <span className="text-sm font-bold text-primary">{product.priceRange}</span>
                          <span className="text-electric font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>

              {/* Empty state component */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-24 bg-white rounded-2xl shadow-sm px-5 border border-gray-150">
                  <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <SlidersHorizontal className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-text-dark">No products match filters</h3>
                  <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm leading-relaxed">
                    We couldn&apos;t find any Knox products matching your exact active combinations. Try loosening your filters or resetting them.
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      onClick={resetAllFilters}
                      className="bg-primary text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-primary-dark transition-all shadow-md cursor-pointer hover:shadow-lg"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              )}

            </main>

          </div>

        </div>
      </section>

      {/* C. Mobile Slide-out Drawer Panel */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            {/* Drawer backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-primary-deeper/80 backdrop-blur-sm z-50 lg:hidden"
            />
            {/* Drawer body container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 max-w-sm w-full bg-white z-50 shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer header panel */}
              <div className="flex items-center justify-between border-b border-gray-100 p-5 shrink-0">
                <h3 className="font-heading font-bold text-text-dark text-base flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-8 h-8 rounded-full bg-bg-light flex items-center justify-center text-gray-400 hover:text-text-dark cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer body filter selections */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
                
                {/* 1. Category in Mobile */}
                <div>
                  <h4 className="font-heading font-bold text-xs text-gray-400 uppercase tracking-widest mb-3">
                    Product Category
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleCategoryClick("all")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeCategory === "all"
                          ? "bg-primary text-white"
                          : "bg-bg-light text-text-dark"
                      }`}
                    >
                      All Products
                    </button>
                    {productCategories
                      .filter((c) => c.slug !== "future-products")
                      .map((cat) => (
                        <button
                          key={cat.slug}
                          onClick={() => handleCategoryClick(cat.slug)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            activeCategory === cat.slug
                              ? "bg-primary text-white"
                              : "bg-bg-light text-text-dark"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                  </div>
                </div>

                {/* 2. Inverter type in Mobile */}
                {(activeCategory === "all" || activeCategory === "inverter") && (
                  <div>
                    <h4 className="font-heading font-bold text-xs text-gray-400 uppercase tracking-widest mb-3">
                      Inverter Type
                    </h4>
                    <div className="space-y-3">
                      {[
                        { label: "Hybrid Inverter", value: "hybrid" },
                        { label: "On-Grid Inverter", value: "on-grid" },
                        { label: "Off-Grid Inverter", value: "off-grid" },
                      ].map((item) => (
                        <label
                          key={item.value}
                          className="flex items-center gap-3 text-sm text-text-dark cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedInverterTypes.includes(item.value)}
                            onChange={() => toggleInverterType(item.value)}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-md bg-white peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-accent opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                          <span className="text-sm font-semibold">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Series in Mobile */}
                <div>
                  <h4 className="font-heading font-bold text-xs text-gray-400 uppercase tracking-widest mb-3">
                    Brand Series
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {availableSeriesList.map((seriesName) => (
                      <label
                        key={seriesName}
                        className="flex items-center gap-2 text-xs text-text-dark cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSeries.includes(seriesName)}
                          onChange={() => toggleSeries(seriesName)}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md bg-white peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-accent opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-xs font-semibold truncate">{seriesName}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 4. Status in Mobile */}
                <div>
                  <h4 className="font-heading font-bold text-xs text-gray-400 uppercase tracking-widest mb-3">
                    Status
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: "Available Now", value: "available" },
                      { label: "Coming Soon", value: "coming-soon" },
                    ].map((item) => (
                      <label
                        key={item.value}
                        className="flex items-center gap-3 text-sm text-text-dark cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStatuses.includes(item.value)}
                          onChange={() => toggleStatus(item.value)}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md bg-white peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-accent opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm font-semibold">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* Drawer footer drawer buttons */}
              <div className="border-t border-gray-100 p-5 shrink-0 flex gap-3 bg-bg-light/50">
                <button
                  onClick={resetAllFilters}
                  className="flex-1 border border-gray-200 bg-white hover:bg-bg-light text-text-dark text-xs font-bold py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 bg-primary text-white hover:bg-primary-dark text-xs font-bold py-3.5 rounded-xl transition-all cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
