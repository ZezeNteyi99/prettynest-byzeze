import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-products.jpg";

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">Our Story</span>
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Welcome to 
              <span className="gradient-text"> PrettyNest</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A cozy corner of the internet where beauty meets thoughtfulness
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={heroImage} 
                alt="PrettyNest products" 
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6">
                The Story Behind PrettyNest
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  PrettyNest was born from a simple belief: every person deserves to feel 
                  beautiful and special. What started as a passion project has grown into 
                  a carefully curated collection of beauty essentials, hair accessories, 
                  and thoughtful gifts.
                </p>
                <p>
                  The name "PrettyNest" represents our vision – a cozy, beautiful space 
                  where you can find products that make you feel confident and cherished. 
                  Every item in our collection is handpicked with love and care.
                </p>
                <p>
                  Behind PrettyNest is Zeze, a passionate entrepreneur who believes in 
                  the power of small luxuries to brighten everyday life. From lip glosses 
                  that make you smile to gift sets that show someone you care – every 
                  product tells a story.
                </p>
              </div>
              <Link to="/shop" className="inline-block mt-8">
                <Button variant="hero" size="lg">
                  Explore Our Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Made with Love",
                description: "Every product is selected with care, ensuring quality and thoughtfulness in everything we offer.",
              },
              {
                icon: Sparkles,
                title: "Affordable Luxury",
                description: "We believe beautiful things don't have to break the bank. Our products are premium yet accessible.",
              },
              {
                icon: Users,
                title: "Community First",
                description: "We're more than a shop – we're a community of people who appreciate the little things that make life special.",
              },
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-card p-8 rounded-2xl text-center shadow-card hover:shadow-hover transition-shadow"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Have Questions?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We'd love to hear from you! Whether you have questions about our products 
            or just want to say hello.
          </p>
          <Link to="/contact">
            <Button variant="outline" size="lg">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
