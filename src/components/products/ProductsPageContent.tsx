"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { products, productCategories } from "@/data/products";

export default function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";
  const initialCat = searchParams.get("category") || "all";
  const [activeFilter, setActiveFilter] = useState(initialCat);

  // Sync activeFilter state with URL parameter if it changes
  useEffect(() => {
    setActiveFilter(initialCat);
  }, [initialCat]);

  const handleCategoryClick = (categorySlug: string) => {
    setActiveFilter(categorySlug);
    if (searchQuery) {
      router.push(`/products?category=${categorySlug}`);
    } else {
      router.push(`/products?category=${categorySlug}`);
    }
  };

  // Filter products by category
  let filtered =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.categorySlug === activeFilter);

  // If there's a search term, filter within selected category
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.specs.some((spec) =>
          spec.label.toLowerCase().includes(q) ||
          spec.value.toLowerCase().includes(q)
        )
    );
  }

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

      {/* Category Filter */}
      <section className="py-6 bg-white sticky top-[72px] z-30 border-b border-gray-100 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCategoryClick("all")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-primary text-white"
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
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    activeFilter === cat.slug
                      ? "bg-primary text-white"
                      : "bg-bg-light text-text-dark hover:bg-primary/10"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-bg-light min-h-[500px]">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <p className="text-gray-500 text-sm">
              Showing <span className="font-semibold text-text-dark">{filtered.length}</span> products
              {searchQuery && (
                <>
                  {" "}for &ldquo;<span className="text-primary font-semibold">{searchQuery}</span>&rdquo;
                </>
              )}
              {activeFilter !== "all" && (
                <>
                  {" "}in <span className="text-primary font-semibold">{productCategories.find(c => c.slug === activeFilter)?.name}</span>
                </>
              )}
            </p>
            {searchQuery && (
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs bg-primary text-white hover:bg-primary-dark px-3 py-1.5 rounded-lg font-medium transition-colors shadow-sm self-start sm:self-auto"
              >
                <X className="w-3.5 h-3.5" />
                Clear Search
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 0.05}>
                <Link
                  href={`/products/${product.slug}`}
                  className="block bg-white rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group h-full"
                >
                  <div className="relative h-[220px] overflow-hidden bg-bg-light">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 bg-primary/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-lg text-text-dark group-hover:text-electric transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {product.specs.slice(0, 3).map((spec) => (
                        <span
                          key={spec.label}
                          className="text-[11px] bg-bg-light text-gray-500 px-2 py-1 rounded font-medium border border-gray-100"
                        >
                          {spec.label}: {spec.value}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
                      <span className="text-sm font-semibold text-primary">{product.priceRange}</span>
                      <span className="text-electric font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm px-5 border border-gray-100">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-text-dark">No products found</h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">
                We couldn&apos;t find any products matching your criteria. Try searching for something else or clearing the search query.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link
                  href="/products"
                  className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary-dark transition-all shadow-sm cursor-pointer"
                >
                  View All Products
                </Link>
                {searchQuery && (
                  <button
                    onClick={() => handleCategoryClick(activeFilter)}
                    className="bg-bg-light text-text-dark text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-200 transition-all border border-gray-200 cursor-pointer"
                  >
                    Clear Search Term
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
