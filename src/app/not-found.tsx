import { AlertTriangle, Home, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "404 - Page Not Found | Sky Zone International",
  description: "The page you are looking for is not found.",
};

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-28 pb-16 bg-bg-light/35">
      <div className="max-w-lg w-full px-5 text-center">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent-dark shadow-sm border border-accent/20">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <h1 className="text-7xl md:text-8xl font-heading font-extrabold text-primary leading-none tracking-tight">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-dark mt-4">
          Page Not Found
        </h2>
        <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
            Go Back Home
          </Button>
          <Button href="/products" variant="outline" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Explore Products
          </Button>
        </div>
      </div>
    </div>
  );
}
