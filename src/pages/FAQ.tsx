import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronDown, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqCategories = [
  {
    name: "Orders & Delivery",
    questions: [
      {
        q: "Where are you located?",
        a: "We're based in Johannesburg, South Africa. We offer hand delivery in selected areas and courier services nationwide.",
      },
      {
        q: "Do you offer hand delivery?",
        a: "Yes! We offer personal hand delivery in selected areas around Johannesburg. For areas outside our delivery zone, we use reliable courier services.",
      },
      {
        q: "How long does delivery take?",
        a: "Hand deliveries are usually done within 2-3 business days. Courier deliveries typically take 3-5 business days depending on your location.",
      },
    ],
  },
  {
    name: "Products & Gifts",
    questions: [
      {
        q: "Do you offer gift wrapping?",
        a: "Absolutely! We offer beautiful gift wrapping for all orders. Just select the gift wrap option at checkout and we'll make it extra special.",
      },
      {
        q: "Can I include a personalized note or card?",
        a: "Yes, you can! We love adding personal touches. You can add a personalized message during checkout and we'll include a beautiful handwritten card with your order.",
      },
      {
        q: "Do you have options for special occasions (birthdays, holidays)?",
        a: "We sure do! Check out our Gifts & Combos section for curated gift sets perfect for birthdays, holidays, and special celebrations. We can also create custom gift boxes on request.",
      },
      {
        q: "How do I buy a gift card?",
        a: "Gift cards are coming soon! In the meantime, feel free to contact us and we can arrange a special gift voucher for you.",
      },
    ],
  },
  {
    name: "Payments",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept EFT (Electronic Funds Transfer), Cash on delivery (for hand deliveries), and various other payment methods. Contact us for more details.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes, absolutely. We take your security seriously. We don't store any payment card details and all transactions are handled securely.",
      },
      {
        q: "Can I pay in installments or with afterpay?",
        a: "We're working on adding installment payment options. For now, please contact us if you need a payment plan for larger orders.",
      },
    ],
  },
  {
    name: "About PrettyNest",
    questions: [
      {
        q: "Who is behind PrettyNest?",
        a: "PrettyNest is run by Zeze, a passionate entrepreneur who believes everyone deserves something beautiful. It started as a passion project and has grown into a curated collection of beauty essentials and gifts.",
      },
      {
        q: "What inspired the name?",
        a: "'PrettyNest' represents a cozy, beautiful space – like a nest – where you can find products that make you feel confident and cherished. It's your personal corner of pretty things!",
      },
      {
        q: "Do you collaborate with local artists or makers?",
        a: "We love supporting local! We're always open to collaborations with local artists and makers. If you're interested in collaborating, please reach out via our contact page.",
      },
    ],
  },
  {
    name: "Custom Orders",
    questions: [
      {
        q: "Can I request custom colors or designs?",
        a: "For certain products like press-on nails and some accessories, we can accommodate custom requests. Contact us with your ideas and we'll see what we can do!",
      },
      {
        q: "Do you offer bulk orders for events or parties?",
        a: "Yes! We offer bulk orders for events, parties, bridal showers, and corporate gifts. Contact us for special pricing on bulk orders.",
      },
      {
        q: "Can you create personalized gift sets?",
        a: "Absolutely! We love creating personalized gift sets. Tell us your budget and preferences, and we'll curate something special.",
      },
      {
        q: "How long do custom orders take to process?",
        a: "Custom orders typically take 5-7 business days to prepare, plus delivery time. We'll give you a specific timeline when you place your order.",
      },
      {
        q: "Is there an extra fee for customizations?",
        a: "It depends on the customization. Simple requests like gift wrapping and personalized notes are free. More complex customizations may have a small additional fee which we'll discuss with you upfront.",
      },
    ],
  },
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find answers to common questions about orders, delivery, products, and more.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
                {category.name}
              </h2>
              <div className="space-y-3">
                {category.questions.map((item, qIndex) => {
                  const itemId = `${catIndex}-${qIndex}`;
                  const isOpen = openItems.includes(itemId);
                  
                  return (
                    <div
                      key={qIndex}
                      className="bg-card rounded-xl border border-border overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors"
                      >
                        <span className="font-medium text-foreground pr-4">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "grid transition-all duration-200",
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-5 text-muted-foreground">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Still have questions */}
          <div className="mt-16 text-center p-8 bg-secondary/30 rounded-2xl">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? We're here to help!
            </p>
            <Link to="/contact">
              <button className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FAQ;
