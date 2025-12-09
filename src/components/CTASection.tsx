import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-newsletter-confirmation', {
        body: { email: email.trim() },
      });

      if (error) {
        console.error("Newsletter error:", error);
        throw error;
      }

      toast.success("Welcome to the PrettyNest family! Check your email 💕");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-[20%] w-40 h-40 rounded-full bg-primary/20 blur-3xl float-animation" />
      <div className="absolute bottom-10 right-[10%] w-32 h-32 rounded-full bg-accent/30 blur-2xl float-animation-delayed" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Join the
            <span className="gradient-text"> PrettyNest </span>
            Family
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and be the first to know about new arrivals, 
            exclusive offers, and beauty tips.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 px-6 rounded-full border border-border bg-card/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" size="lg" variant="hero" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe"}
              {!isLoading && <ArrowRight className="h-4 w-4 ml-1" />}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground">
            No spam, unsubscribe anytime. By subscribing you agree to our Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
}
