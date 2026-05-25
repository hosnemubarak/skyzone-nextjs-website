import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { companyInfo } from "@/data/navigation";
import SocialIcon from "@/components/ui/SocialIcon";
import { productCategories } from "@/data/products";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const productLinks = productCategories
  .filter((c) => c.slug !== "future-products")
  .map((cat) => ({
    label: cat.name,
    href: `/products?category=${cat.slug}`,
  }));

export default function Footer() {
  return (
    <footer className="bg-primary-deeper text-white">
      {/* Gradient top border */}
      <div className="h-1 bg-gradient-to-r from-accent via-electric to-accent" />

      <div className="max-w-[1200px] mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-lg overflow-hidden shadow-sm">
                <Image
                  src="/images/logo.png"
                  alt="Sky Zone International Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Sky Zone <span className="text-accent">International</span>
              </h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Leading Bangladesh-based supplier, importer, and distributor of
              solar panels, inverters, batteries, and electrical equipment.
            </p>
            <div className="flex gap-3 mt-6">
              {(["facebook", "linkedin", "youtube"] as const).map((type) => (
                <a
                  key={type}
                  href={companyInfo.social[type === "youtube" ? "youtube" : type]}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-accent hover:text-primary transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon type={type} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-accent hover:pl-1 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-accent hover:pl-1 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <a
                  href={companyInfo.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-accent text-sm transition-colors leading-relaxed"
                >
                  {companyInfo.address}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="text-white/60 hover:text-accent text-sm transition-colors"
                >
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-white/60 hover:text-accent text-sm transition-colors"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent shrink-0" />
                <span className="text-white/60 text-sm">{companyInfo.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">{companyInfo.copyright}</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 text-sm hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 text-sm hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
