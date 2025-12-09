import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            
            <div className="bg-card p-8 rounded-2xl border border-border">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground">
                By accessing and using PrettyNest by Zeze's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                2. Products and Services
              </h2>
              <p className="text-muted-foreground mb-4">
                PrettyNest by Zeze offers beauty and cosmetic products including lip care, body care, hair accessories, and gift items. All products are described as accurately as possible, but we cannot guarantee that product colors displayed on your screen will be exact.
              </p>
              <p className="text-muted-foreground">
                We reserve the right to limit quantities, refuse orders, or discontinue products at any time without prior notice.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                3. Orders and Payments
              </h2>
              <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                <li>All prices are listed in South African Rand (ZAR)</li>
                <li>Payment must be made in full before orders are processed</li>
                <li>We accept various payment methods as displayed at checkout</li>
                <li>Orders are confirmed via email or WhatsApp once payment is received</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                4. Shipping and Delivery
              </h2>
              <p className="text-muted-foreground mb-4">
                We offer hand delivery in selected areas of Johannesburg and courier services nationwide. Delivery times are estimates and may vary based on location and availability.
              </p>
              <p className="text-muted-foreground">
                For full details on shipping, please visit our{" "}
                <Link to="/shipping" className="text-primary hover:underline">
                  Shipping & Returns
                </Link>{" "}
                page.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                5. Returns and Refunds
              </h2>
              <p className="text-muted-foreground">
                Due to the nature of beauty products, we only accept returns for unopened, unused items within 7 days of delivery. Refunds will be processed within 5-7 business days after we receive and inspect the returned item.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-muted-foreground">
                All content on this website, including images, text, logos, and designs, are the property of PrettyNest by Zeze and are protected by copyright laws. You may not reproduce, distribute, or use any content without our written permission.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-muted-foreground">
                PrettyNest by Zeze shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the purchase price of the products ordered.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                8. Changes to Terms
              </h2>
              <p className="text-muted-foreground">
                We reserve the right to update or modify these terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of our services constitutes acceptance of any changes.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                9. Contact Us
              </h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please{" "}
                <Link to="/contact" className="text-primary hover:underline">
                  contact us
                </Link>
                .
              </p>
            </div>

            <p className="text-sm text-muted-foreground text-center pt-8">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Terms;
