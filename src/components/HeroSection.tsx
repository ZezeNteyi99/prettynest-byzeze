import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-products.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-[10%] w-32 h-32 rounded-full bg-primary/20 blur-3xl float-animation" />
      <div className="absolute bottom-32 right-[15%] w-48 h-48 rounded-full bg-accent/20 blur-3xl float-animation-delayed" />
      <div className="absolute top-1/2 left-[60%] w-24 h-24 rounded-full bg-soft-pink/30 blur-2xl float-animation-slow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 fade-in-up">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">New Collection Available</span>
            </div>
            
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-4 fade-in-up stagger-1">
              Because you deserve
              <span className="block gradient-text">something beautiful</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 fade-in-up stagger-2">
              Discover our curated collection of beauty essentials, hair accessories, 
              and thoughtful gifts. Every product is chosen with love, just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start fade-in-up stagger-3">
              <Link to="/shop">
                <Button size="xl" variant="hero">
                  Shop Now
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="xl" variant="outline">
                  Our Story
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-8 mt-12 justify-center lg:justify-start fade-in-up stagger-4">
              <div className="text-center">
                <span className="block font-heading text-2xl font-semibold text-foreground">50+</span>
                <span className="text-sm text-muted-foreground">Products</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <span className="block font-heading text-2xl font-semibold text-foreground">1k+</span>
                <span className="text-sm text-muted-foreground">Happy Customers</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <span className="block font-heading text-2xl font-semibold text-foreground">5★</span>
                <span className="text-sm text-muted-foreground">Reviews</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative fade-in-up stagger-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="PrettyNest beauty products collection"
                className="w-full h-auto object-cover"
              />
              
              {/* Glass Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Featured</p>
                    <p className="font-heading text-lg font-medium">Rose Collection</p>
                  </div>
                  <Link to="/shop">
                    <Button variant="hero" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Decorative Badge */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-accent flex items-center justify-center shadow-glow float-animation">
              <div className="text-center text-accent-foreground">
                <span className="block text-xs font-medium">From</span>
                <span className="block font-heading text-xl font-bold">R49</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
