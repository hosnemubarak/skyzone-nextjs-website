"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowRight, Search, X, ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Dropdown from "@/components/ui/Dropdown";
import { products, productCategories } from "@/data/products";

export default function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Sync category & search from URL parameters
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "all";

  // State controls for category, status, and sorting
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [statusFilter, setStatusFilter] = useState<"all" | "available" | "coming-soon">("all");
  const [sortOrder, setSortOrder] = useState<"name-asc" | "name-desc">("name-asc");

  // Sync category state with URL parameter if it changes
  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  // Load initial status and sort from URL if present
  useEffect(() => {
    const status = searchParams.get("status") as "all" | "available" | "coming-soon" || "all";
    const sort = searchParams.get("sort") as "name-asc" | "name-desc" || "name-asc";
    setStatusFilter(status);
    setSortOrder(sort);
  }, [searchParams]);

  // Update URL search parameters
  const updateURL = (category: string, status: string, sort: string) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (category !== "all") params.set("category", category);
    if (status !== "all") params.set("status", status);
    if (sort !== "name-asc") params.set("sort", sort);

    router.push(`/products?${params.toString()}`);
  };

  const handleCategoryClick = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    updateURL(categorySlug, statusFilter, sortOrder);
  };

  const handleStatusChange = (status: "all" | "available" | "coming-soon") => {
    setStatusFilter(status);
    updateURL(activeCategory, status, sortOrder);
  };

  const handleSortChange = (sort: "name-asc" | "name-desc") => {
    setSortOrder(sort);
    updateURL(activeCategory, statusFilter, sort);
  };

  // Compile final filtered & sorted products list
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // 1. Category Filter
    if (activeCategory !== "all") {
      list = list.filter((p) => p.categorySlug === activeCategory);
    }

    // 2. Search Query Filter
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

    // 3. Status Filter (Available vs Coming Soon)
    if (statusFilter !== "all") {
      list = list.filter((p) => {
        if (statusFilter === "available") return p.published === true;
        if (statusFilter === "coming-soon") return p.published === false;
        return true;
      });
    }

    // 4. Alphabetical Sorting (A-Z or Z-A)
    list.sort((a, b) => {
      if (sortOrder === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [activeCategory, searchQuery, statusFilter, sortOrder]);

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

      {/* Category Tab Selector */}
      <section className="py-4 bg-white sticky top-[72px] z-30 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex flex-wrap gap-2 md:gap-3 items-center">
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
        </div>
      </section>

      {/* Products Grid & Inline Controls */}
      <section className="py-12 bg-bg-light min-h-[600px]">
        <div className="max-w-[1200px] mx-auto px-5">
          
          {/* Header Panel with Result Count and Inline Selectors */}
          <div className="bg-white rounded-2xl p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <div>
              <p className="text-gray-500 text-sm font-medium">
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
            </div>

            {/* Inline Selectors */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              {searchQuery && (
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer w-full md:w-auto shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear Search
                </Link>
              )}

              {/* Status Selector Dropdown */}
              <Dropdown
                label="Status"
                value={statusFilter}
                options={[
                  { value: "all", label: "All Products" },
                  { value: "available", label: "Available Now" },
                  { value: "coming-soon", label: "Coming Soon" },
                ]}
                onChange={handleStatusChange}
                align="left"
                className="flex-1 min-w-[140px] md:flex-none"
              />

              {/* Sort Selector Dropdown */}
              <Dropdown
                label="Sort By"
                value={sortOrder}
                options={[
                  { value: "name-asc", label: "Name (A - Z)" },
                  { value: "name-desc", label: "Name (Z - A)" },
                ]}
                onChange={handleSortChange}
                align="right"
                className="flex-1 min-w-[140px] md:flex-none"
              />
            </div>
          </div>

          {/* Grid of Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 0.05}>
                <Link
                  href={`/products/${product.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 group h-full"
                >
                  <div className="relative h-[220px] overflow-hidden bg-gray-50 flex items-center justify-center">
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
                            className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-semibold"
                          >
                            {spec.label}: {spec.value}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100/70">
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

          {/* Empty state panel */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-24 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] px-5">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl text-text-dark">No products found</h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm leading-relaxed">
                We couldn&apos;t find any Knox products matching your selected filters. Try changing your search query or setting the status back to &quot;All Products&quot;.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setStatusFilter("all");
                    setSortOrder("name-asc");
                    const params = new URLSearchParams();
                    if (searchQuery) params.set("search", searchQuery);
                    if (activeCategory !== "all") params.set("category", activeCategory);
                    router.push(`/products?${params.toString()}`);
                  }}
                  className="bg-primary text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-primary-dark transition-all shadow-md cursor-pointer hover:shadow-lg"
                >
                  Reset Status Filter
                </button>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
