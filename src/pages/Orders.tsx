import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Search, Calendar, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  province: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  created_at: string;
}

const Orders = () => {
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('email', email.trim().toLowerCase())
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Search error:", error);
        throw error;
      }

      // Type assertion for the items field
      const typedOrders = (data || []).map(order => ({
        ...order,
        items: order.items as unknown as OrderItem[],
      }));

      setOrders(typedOrders);

      if (typedOrders.length === 0) {
        toast.info("No orders found for this email address");
      }
    } catch (error) {
      console.error("Order lookup error:", error);
      toast.error("Failed to search orders. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-secondary text-foreground';
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-heading text-4xl font-semibold text-foreground mb-4">
              Order History
            </h1>
            <p className="text-muted-foreground">
              Enter your email address to view your order history
            </p>
          </div>
        </div>
      </section>

      {/* Search Form */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex gap-3">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" variant="hero" disabled={isSearching}>
                    {isSearching ? "Searching..." : <Search className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Orders List */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          {hasSearched && orders.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-12">
              <div className="h-20 w-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
                <Package className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
                No orders found
              </h2>
              <p className="text-muted-foreground">
                We couldn't find any orders associated with this email address.
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-card rounded-2xl border border-border overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-border bg-secondary/30">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                        <p className="font-heading font-semibold text-foreground">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatDate(order.created_at)}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × R{item.price}
                            </p>
                          </div>
                          <p className="font-semibold text-foreground">
                            R{item.price * item.quantity}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address */}
                    <div className="flex items-start gap-2 text-sm text-muted-foreground mb-6 p-4 bg-secondary/30 rounded-xl">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Shipping Address</p>
                        <p>
                          {order.first_name} {order.last_name}<br />
                          {order.address}<br />
                          {order.city}, {order.province} {order.postal_code}
                        </p>
                      </div>
                    </div>

                    {/* Order Total */}
                    <div className="border-t border-border pt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">R{order.subtotal}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-foreground">R{order.shipping}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">Total</span>
                        <span className="font-heading text-xl font-semibold text-primary">
                          R{order.total}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Orders;
