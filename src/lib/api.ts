import { products, productCategories } from "@/data/products";
import type { Product, ProductCategory } from "@/data/products";

/**
 * Centralized API & Data Service Layer for Products.
 * 
 * In the future, these methods can be modified to make async network requests
 * (e.g., fetch from a database, REST API, or Headless CMS) without requiring
 * modifications in the page or component files that consume them.
 */

/**
 * Retrieves all products.
 */
export async function getProducts(): Promise<Product[]> {
  // Simulate network/db delay (optional, currently direct resolver)
  return products;
}

/**
 * Retrieves a single product by its slug.
 */
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

/**
 * Retrieves all product categories.
 */
export async function getProductCategories(): Promise<ProductCategory[]> {
  return productCategories;
}

/**
 * Retrieves related products for a given category (excluding the current product).
 */
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}
