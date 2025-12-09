import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Filter, Grid3X3, LayoutGrid, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [showFilters, setShowFilters] = useState(false);
  
  const activeCategory = searchParams.get("category") || "all";

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", categoryId);
    }
    setSearchParams(searchParams);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Shop</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
            Our Products
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Explore our complete collection of beauty essentials, hair accessories, and thoughtful gifts.
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Categories - Desktop */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              <Button
                variant={activeCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange("all")}
              >
                All Products
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <Button 
              variant="outline" 
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter by Category
            </Button>

            {/* View Mode & Results Count */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </span>
              <div className="flex items-center gap-1 border border-border rounded-full p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
                    viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
                    viewMode === "compact" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mb-6 p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Categories</span>
                <button onClick={() => setShowFilters(false)}>
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    handleCategoryChange("all");
                    setShowFilters(false);
                  }}
                >
                  All Products
                </Button>
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={activeCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      handleCategoryChange(cat.id);
                      setShowFilters(false);
                    }}
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className={cn(
            "grid gap-6",
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          )}>
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product}
                style={{ animationDelay: `${index * 50}ms` }}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found in this category.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => handleCategoryChange("all")}
              >
                View All Products
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Shop;
