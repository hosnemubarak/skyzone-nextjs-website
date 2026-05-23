import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import ProductCategories from "@/components/home/ProductCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandsPartners from "@/components/home/BrandsPartners";
import DealerOpportunity from "@/components/home/DealerOpportunity";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ProductCategories />
      <FeaturedProducts />
      <BrandsPartners />
      <DealerOpportunity />
      <ContactCTA />
    </>
  );
}
