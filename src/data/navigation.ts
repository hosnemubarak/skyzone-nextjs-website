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
  address: "Shop No. 11-12 (3rd Floor), CDA Market, Jubilee Road, Chittagong, Bangladesh",
  phone: "+8801833994455",
  email: "info@skyzoneintl.com",
  hours: "Sat–Thu: 9:00 AM – 6:00 PM",
  closedDay: "Friday: Closed",
  whatsapp: "https://wa.me/8801833994455",
  mapLink: "https://www.google.com/maps/place/Amtala+More,+New+Market,+Chattogram/@22.3363139,91.832025,21z/data=!4m15!1m8!3m7!1s0x30ad2758116bfeb5:0x23c12eea36357f30!2sShah+Amanat+City+Corporation+Super+Market,+Chittagong!3b1!8m2!3d22.33665!4d91.8325572!16s%2Fg%2F12llkmv5g!3m5!1s0x30ad27a11fde6211:0xb2539814db308a39!8m2!3d22.3363729!4d91.8322532!16s%2Fg%2F11vc8fpnyb?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D",
  social: {
    facebook: "#",
    linkedin: "#",
    youtube: "#",
  },
  founded: "2026",
  copyright: `© ${new Date().getFullYear()} Sky Zone International. All rights reserved.`,
};
