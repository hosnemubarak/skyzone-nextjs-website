import { Clock, Home, Mail, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Coming Soon | Sky Zone International",
  description: "Exciting solar and hybrid inverter solutions are coming soon.",
};

export default function ComingSoon() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-28 pb-16 bg-primary text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-2xl w-full px-5 text-center z-10">
        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-accent border border-accent/30 animate-pulse">
          <Clock className="w-10 h-10" />
        </div>
        <div className="mb-4">
          <span className="text-xs bg-accent/25 border border-accent/30 text-accent px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
            Coming Soon
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mt-6 leading-tight">
          Exciting Solutions <br />
          <span className="text-accent">Coming Soon</span>
        </h1>
        <p className="text-sm md:text-base text-white/70 mt-4 leading-relaxed max-w-lg mx-auto">
          We are currently building and optimizing this section of our website to bring you Knox&apos;s latest sustainable solar, VFD pumping, and battery energy storage products.
        </p>

        {/* Subscribe box */}
        <div className="max-w-md mx-auto mt-10 p-1 bg-white/5 backdrop-blur border border-white/10 rounded-2xl flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2">
            <Mail className="w-4 h-4 text-white/40 shrink-0" />
            <input
              type="email"
              placeholder="Enter your email to get notified"
              className="w-full bg-transparent border-none outline-none text-sm placeholder:text-white/40 text-white"
              disabled
            />
          </div>
          <button 
            type="button"
            className="bg-accent hover:bg-accent-dark text-primary font-bold text-xs md:text-sm px-6 py-3 rounded-xl transition-all cursor-not-allowed opacity-80"
            disabled
          >
            Notify Me
          </button>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" variant="secondary" size="md" icon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
          <Button href="/products" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Browse Active Products
          </Button>
        </div>
      </div>
    </div>
  );
}
