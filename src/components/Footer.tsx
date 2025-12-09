import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "Lip Care", href: "/shop?category=lips" },
    { name: "Body Care", href: "/shop?category=body" },
    { name: "Hair Accessories", href: "/shop?category=hair" },
    { name: "Gifts", href: "/shop?category=gifts" },
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Shipping & Returns", href: "/shipping" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-baseline gap-1 mb-4">
              <span className="font-heading text-2xl font-semibold text-foreground">
                PrettyNest
              </span>
              <span className="text-[10px] font-body text-muted-foreground italic -translate-y-1">
                by Zeze
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 italic">
              "Because you deserve something beautiful"
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@prettynest.com"
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Johannesburg, South Africa
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:+27612873693" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +27 61 287 3693
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:hello@prettynest.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  hello@prettynest.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PrettyNest by Zeze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
