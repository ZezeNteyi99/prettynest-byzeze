import { Gift, Truck, Heart, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Gift,
    title: "Gift Wrapping",
    description: "Beautiful gift wrapping available for all orders",
  },
  {
    icon: Truck,
    title: "Hand Delivery",
    description: "Personal hand delivery in selected areas",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every product selected with care and love",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Hassle-free returns within 7 days",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 border-y border-border bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-medium text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
