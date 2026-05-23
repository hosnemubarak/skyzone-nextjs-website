import { CheckCircle, Home, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Thank You | Sky Zone International",
  description: "Thank you for contacting us. Your message has been received.",
};

export default function ThankYou() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-28 pb-16 bg-bg-light/35">
      <div className="max-w-lg w-full px-5 text-center">
        {/* Success checkmark with dynamic rings */}
        <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-green-500/10 rounded-full animate-pulse" />
          <div className="relative w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-600 border border-green-500/20 shadow-sm">
            <CheckCircle className="w-12 h-12" />
          </div>
        </div>

        <span className="text-xs bg-green-500/10 border border-green-500/15 text-green-700 px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
          Submission Successful
        </span>
        
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-text-dark mt-6 leading-tight">
          Thank You!
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed max-w-md mx-auto">
          Your inquiry has been successfully received by our sales and support team. We appreciate you reaching out, and a technical representative will contact you via email or phone within the next 24 hours.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
          <Button href="/products" variant="outline" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Explore Products
          </Button>
        </div>
      </div>
    </div>
  );
}
