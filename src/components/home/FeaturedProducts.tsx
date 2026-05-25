"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  const featured = useMemo(() => {
    // 1. Group products by categorySlug and sort them:
    //    - Prioritize published products first
    //    - Sort alphabetically by name within the same publication status
    const categoryCounts = products.reduce((acc, p) => {
      acc[p.categorySlug] = (acc[p.categorySlug] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categories = Array.from(new Set(products.map((p) => p.categorySlug)))
      .sort((a, b) => categoryCounts[b] - categoryCounts[a]);

    const groups: Record<string, typeof products> = {};
    categories.forEach((cat) => {
      groups[cat] = products
        .filter((p) => p.categorySlug === cat)
        .sort((a, b) => {
          if (a.published !== b.published) {
            return a.published ? -1 : 1;
          }
          return a.name.localeCompare(b.name);
        });
    });

    // 2. Select up to 6 products using round-robin representation
    const selected: typeof products = [];
    let index = 0;
    while (selected.length < 6) {
      let addedAny = false;
      for (const cat of categories) {
        if (groups[cat] && groups[cat].length > index) {
          selected.push(groups[cat][index]);
          addedAny = true;
          if (selected.length === 6) break;
        }
      }
      if (!addedAny) break;
      index++;
    }

    // 3. Sort the chosen 6 products alphabetically by name
    return selected.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  return (
    <section className="bg-bg-light py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5">
        <SectionHeader
          label="Featured Products"
          title="Top-Selling Products"
          subtitle="Discover our most popular energy solutions trusted for high performance and reliability across Bangladesh"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {featured.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.1}>
              <Link
                href={`/products/${product.slug}`}
                className="block bg-white rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-[220px] overflow-hidden bg-bg-light">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {!product.published ? (
                    <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 animate-pulse">
                      Coming Soon
                    </span>
                  ) : product.badge && (
                    <span className="absolute top-3 left-3 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-primary/80 text-white text-xs px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-lg text-text-dark">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {product.shortDescription}
                  </p>

                  {/* Specs preview */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {product.specs.slice(0, 2).map((spec) => (
                      <span
                        key={spec.label}
                        className="text-xs bg-bg-light text-gray-500 px-2 py-1 rounded"
                      >
                        {spec.label}: {spec.value}
                      </span>
                    ))}
                  </div>

                  {/* Bottom */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      {product.priceRange}
                    </span>
                    <span className="text-electric font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Details
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
