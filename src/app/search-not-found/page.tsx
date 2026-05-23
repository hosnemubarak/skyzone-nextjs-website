import { Search, Folder, HelpCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { productCategories } from "@/data/products";

export const metadata = {
  title: "Search Results Empty | Sky Zone International",
  description: "No product matching your search criteria was found.",
};

export default function SearchNotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-28 pb-16 bg-bg-light/35">
      <div className="max-w-2xl w-full px-5 text-center">
        {/* Search empty icon container */}
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary border border-primary/10">
          <Search className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-heading font-extrabold text-text-dark leading-tight">
          No Results Found
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-3 leading-relaxed max-w-md mx-auto">
          We couldn&apos;t find any Knox products matching your exact query. Try refining your spelling, using simpler keywords, or browsing by category.
        </p>

        {/* Central Search Form demo */}
        <form action="/products" method="GET" className="max-w-md mx-auto mt-8 p-1 bg-white border border-gray-200 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-sm">
          <div className="flex-1 flex items-center gap-2 px-3 py-2">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              name="search"
              placeholder="Search inverters, batteries..."
              className="w-full bg-transparent border-none outline-none text-sm text-text-dark placeholder:text-gray-400"
            />
          </div>
          <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-semibold text-xs md:text-sm px-6 py-3 rounded-xl transition-all cursor-pointer">
            Search Again
          </button>
        </form>

        {/* Categories helper links */}
        <div className="mt-10 max-w-md mx-auto">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-4">
            <Folder className="w-3.5 h-3.5" />
            Or Browse Categories
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {productCategories
              .filter((c) => c.slug !== "future-products")
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className="text-xs bg-white hover:bg-primary hover:text-white text-text-dark px-4 py-2 rounded-full transition-all border border-gray-200 font-semibold shadow-sm"
                >
                  {cat.name} ({cat.productCount})
                </Link>
              ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200/50 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" variant="outline" size="md">
            Go Back Home
          </Button>
          <Button href="/contact" variant="primary" size="md" icon={<HelpCircle className="w-4 h-4" />}>
            Ask for Assistance
          </Button>
        </div>
      </div>
    </div>
  );
}
