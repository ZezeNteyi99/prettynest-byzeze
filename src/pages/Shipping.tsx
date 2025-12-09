import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Truck, Package, Clock, MapPin } from "lucide-react";

const Shipping = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Shipping & Returns
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to know about getting your beautiful products delivered.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Delivery Options */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-8 flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              Delivery Options
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="font-heading text-lg font-medium">Hand Delivery</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Available in selected areas around Johannesburg. Personal delivery 
                  with a smile!
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 2-3 business days</li>
                  <li>• Cash on delivery available</li>
                  <li>• Free for orders over R500</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="h-5 w-5 text-primary" />
                  <h3 className="font-heading text-lg font-medium">Courier Delivery</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Nationwide delivery through our trusted courier partners. 
                  Tracked and insured.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 3-5 business days</li>
                  <li>• Tracking number provided</li>
                  <li>• Flat rate shipping fee</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Processing Time */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <Clock className="h-6 w-6 text-primary" />
              Processing Time
            </h2>
            <div className="bg-secondary/30 p-6 rounded-2xl">
              <p className="text-muted-foreground mb-4">
                Most orders are processed within <strong className="text-foreground">1-2 business days</strong>. 
                Custom orders may take longer (5-7 business days).
              </p>
              <p className="text-muted-foreground">
                You'll receive a confirmation email once your order ships with tracking 
                information (for courier deliveries).
              </p>
            </div>
          </div>

          {/* Returns Policy */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
              Returns & Exchanges
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We want you to love your PrettyNest products! If you're not completely 
                satisfied, here's our return policy:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Returns accepted within 7 days of delivery</li>
                <li>Items must be unused and in original packaging</li>
                <li>Beauty products cannot be returned once opened (for hygiene reasons)</li>
                <li>Contact us before returning any items</li>
                <li>Refunds processed within 5-7 business days</li>
              </ul>
              <p className="mt-4">
                <strong className="text-foreground">Damaged or wrong items?</strong> Contact us 
                immediately with photos and we'll sort it out right away!
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center p-8 bg-primary/5 rounded-2xl">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
              Have Questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              We're here to help with any shipping or return inquiries.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Shipping;
