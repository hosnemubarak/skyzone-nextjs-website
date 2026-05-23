import { productCategories } from "./products";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
  icon?: string;
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: productCategories.map((category) => ({
      label: category.name,
      href: `/products?category=${category.slug}`,
      description: category.description,
      icon: category.icon,
    })),
  },
  { label: "Contact", href: "/contact" },
];

export const companyInfo = {
  name: "Sky Zone International",
  tagline: "Powering Bangladesh with Reliable Energy & Electrical Solutions",
  description:
    "Sky Zone International is a leading Bangladesh-based supplier, importer, and distributor of solar panels, inverters, batteries, IPS/UPS systems, electrical equipment, and renewable energy solutions.",
  address: "Shamshuddin Tower, 3rd Floor, Riazuddin Bazar, Chittagong, Bangladesh",
  phone: "+880 1XXX-XXXXXX",
  email: "info@skyzonebd.com",
  hours: "Sat–Thu: 9:00 AM – 6:00 PM",
  closedDay: "Friday: Closed",
  whatsapp: "https://wa.me/8801XXXXXXXXX",
  social: {
    facebook: "#",
    linkedin: "#",
    youtube: "#",
  },
  founded: "2026",
  copyright: `© ${new Date().getFullYear()} Sky Zone International. All rights reserved.`,
};
