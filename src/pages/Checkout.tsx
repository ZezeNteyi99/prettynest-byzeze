import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, ShoppingBag, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    province: "Gauteng",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "postalCode"];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData].trim());
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    const shipping = 50;
    const grandTotal = total + shipping;

    try {
      // Save order to database
      const orderItems = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
          province: formData.province,
          items: orderItems,
          subtotal: total,
          shipping: shipping,
          total: grandTotal,
        })
        .select()
        .single();

      if (orderError) {
        console.error("Order error:", orderError);
        throw new Error("Failed to create order");
      }

      console.log("Order created:", orderData);
      setOrderId(orderData.id);

      // Send order confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-order-confirmation', {
        body: {
          orderId: orderData.id,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          items: orderItems,
          subtotal: total,
          shipping: shipping,
          total: grandTotal,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          province: formData.province,
        },
      });

      if (emailError) {
        console.error("Email error:", emailError);
        // Don't fail the order if email fails
      }

      setOrderComplete(true);
      clearCart();
      toast.success("Order placed successfully! Check your email for confirmation.");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !orderComplete) {
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
                Add some products to your cart before checking out.
              </p>
              <Link to="/shop">
                <Button variant="hero" size="lg">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  if (orderComplete) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
              <h1 className="font-heading text-3xl font-semibold text-foreground mb-4">
                Order Confirmed!
              </h1>
              {orderId && (
                <p className="text-primary font-medium mb-2">
                  Order #{orderId.slice(0, 8).toUpperCase()}
                </p>
              )}
              <p className="text-muted-foreground mb-8">
                Thank you for your order! We've sent a confirmation email with your order details.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/shop">
                  <Button variant="hero" size="lg">
                    Continue Shopping
                  </Button>
                </Link>
                <Link to="/orders">
                  <Button variant="outline" size="lg">
                    View Order History
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const shipping = 50;
  const grandTotal = total + shipping;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-4">
          <Link to="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>
          <h1 className="font-heading text-4xl font-semibold text-foreground">
            Checkout
          </h1>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Customer Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Information */}
                <div className="bg-card p-6 rounded-2xl border border-border">
                  <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                    Contact Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Jane"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="jane@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+27 61 234 5678"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-card p-6 rounded-2xl border border-border">
                  <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Johannesburg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="province">Province</Label>
                        <Input
                          id="province"
                          name="province"
                          value={formData.province}
                          onChange={handleInputChange}
                          placeholder="Gauteng"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="2000"
                        className="max-w-[200px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card p-6 rounded-2xl border border-border sticky top-32">
                  <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                    Order Summary
                  </h2>
                  
                  {/* Items */}
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            R{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">R{total}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground">R{shipping}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="font-heading text-2xl font-semibold text-foreground">
                        R{grandTotal}
                      </span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By placing this order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Checkout;
