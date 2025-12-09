import { Product, useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  style?: React.CSSProperties;
}

export function ProductCard({ product, className, style }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-500",
        className
      )}
      style={style}
    >
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Tags */}
        {'tags' in product && (product as any).tags && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {((product as any).tags as string[]).map((tag: string) => (
              <span
                key={tag}
                className={cn(
                  "px-2 py-1 text-[10px] font-medium uppercase tracking-wide rounded-full",
                  tag === "bestseller" && "bg-primary text-primary-foreground",
                  tag === "new" && "bg-accent text-accent-foreground",
                  tag === "sale" && "bg-destructive text-destructive-foreground",
                  tag === "combo" && "bg-secondary text-secondary-foreground"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <button className="h-9 w-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading text-lg font-medium text-foreground mb-1 line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-xl font-semibold text-foreground">
              R{product.price}
            </span>
            {'originalPrice' in product && (product as any).originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                R{(product as any).originalPrice}
              </span>
            )}
          </div>
          
          <Button
            size="sm"
            variant="hero"
            onClick={() => addToCart(product)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
