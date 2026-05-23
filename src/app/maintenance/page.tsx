import { Settings, ShieldAlert, Mail } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Under Maintenance | Sky Zone International",
  description: "Our systems are currently undergoing optimization. We will be back shortly.",
};

export default function Maintenance() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-28 pb-16 bg-bg-light/35">
      <div className="max-w-lg w-full px-5 text-center">
        {/* Animated cog/wrench wheel */}
        <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping opacity-75" />
          <div className="relative w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20 shadow-sm">
            <Settings className="w-10 h-10 animate-spin-slow" />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-accent rounded-full border-4 border-white flex items-center justify-center text-primary shadow">
            <ShieldAlert className="w-4 h-4 text-primary-deeper" />
          </div>
        </div>

        <span className="text-xs bg-primary/10 border border-primary/15 text-primary px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
          System Optimization
        </span>
        
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-text-dark mt-6 leading-tight">
          System Maintenance
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed max-w-md mx-auto">
          We are currently performing routine upgrades and performance optimization on our servers to improve your catalog browsing experience. We expect to be fully operational within the hour.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            Check Status
          </Button>
          <Button href="/contact" variant="outline" size="md" icon={<Mail className="w-4 h-4" />}>
            Contact Support
          </Button>
        </div>
        
        <p className="text-xs text-gray-400 mt-8">
          Thank you for your patience and cooperation.
        </p>
      </div>
    </div>
  );
}
