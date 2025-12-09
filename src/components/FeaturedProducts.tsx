import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wide">
              Customer Favorites
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mt-2">
              Bestsellers
            </h2>
          </div>
          <Link to="/shop" className="mt-4 md:mt-0">
            <Button variant="ghost" className="group">
              View All Products
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
