import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BackToTop from "@/components/layout/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sky Zone International — Powering Bangladesh with Reliable Energy Solutions",
    template: "%s | Sky Zone International",
  },
  description:
    "Sky Zone International is a leading Bangladesh-based supplier, importer, and distributor of solar panels, inverters, batteries, IPS/UPS systems, electrical equipment, and renewable energy solutions.",
  keywords: [
    "solar panels Bangladesh",
    "inverters",
    "batteries",
    "IPS UPS",
    "electrical equipment",
    "renewable energy",
    "Sky Zone International",
    "energy solutions",
    "solar installation",
    "Chittagong",
  ],
  authors: [{ name: "Sky Zone International" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sky Zone International",
    title: "Sky Zone International — Powering Bangladesh with Reliable Energy Solutions",
    description:
      "Leading supplier of solar panels, inverters, batteries, and electrical equipment in Bangladesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sky Zone International",
    description:
      "Powering Bangladesh with Reliable Energy & Electrical Solutions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
