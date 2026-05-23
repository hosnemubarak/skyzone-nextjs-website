import SearchNotFoundClient from "@/components/utility/SearchNotFoundClient";
import { productCategories } from "@/data/products";

export const metadata = {
  title: "Search Results Empty | Sky Zone International",
  description: "No product matching your search criteria was found.",
};

export default function SearchNotFound() {
  return <SearchNotFoundClient categories={productCategories} />;
}
