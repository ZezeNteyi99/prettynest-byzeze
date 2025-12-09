import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="h-24 w-24 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="font-heading text-3xl font-semibold text-foreground mb-4">
                Your cart is empty
              </h1>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added anything to your cart yet. 
                Explore our collection and find something beautiful!
              </p>
              <Link to="/shop">
                <Button variant="hero" size="lg">
                  Start Shopping
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl font-semibold text-foreground">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground mt-2">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-card rounded-2xl border border-border"
                >
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                  </Link>
                  
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-heading text-lg font-medium text-foreground hover:text-primary transition-colors truncate">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground capitalize">
                      {item.category}
                    </p>
                    
                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex items-center gap-4">
                        <span className="font-heading text-lg font-semibold text-foreground">
                          R{item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card p-6 rounded-2xl border border-border sticky top-32">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">R{total}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="font-heading text-2xl font-semibold text-foreground">
                      R{total}
                    </span>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button variant="hero" size="lg" className="w-full mb-3">
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <Link to="/shop" className="block">
                  <Button variant="ghost" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>

                <div className="mt-6 p-4 bg-secondary/50 rounded-xl">
                  <p className="text-xs text-muted-foreground text-center">
                    Gift wrapping available at checkout! 
                    We also offer personalized notes for that special touch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Cart;
