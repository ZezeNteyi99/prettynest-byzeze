import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { ArrowRight } from "lucide-react";

export function CategoriesSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our carefully curated collections designed to make you feel beautiful
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-card hover:shadow-hover transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                <h3 className="font-heading text-xl md:text-2xl font-semibold mb-1">
                  {category.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-foreground/80">
                    {category.count} products
                  </span>
                  <span className="h-8 w-8 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary transition-colors">
                    <ArrowRight className="h-4 w-4 text-primary-foreground group-hover:text-primary-foreground" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
