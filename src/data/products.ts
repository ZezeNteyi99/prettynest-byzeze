import categoryLips from "@/assets/category-lips.jpg";
import categoryHair from "@/assets/category-hair.jpg";
import categoryGifts from "@/assets/category-gifts.jpg";
import categoryBody from "@/assets/category-body.jpg";
import productNails from "@/assets/product-nails.jpg";
import productPerfume from "@/assets/product-perfume.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  tags?: string[];
  inStock: boolean;
}

export const categories = [
  { id: "lips", name: "Lip Care", image: categoryLips, count: 8 },
  { id: "body", name: "Body Care", image: categoryBody, count: 10 },
  { id: "hair", name: "Hair Accessories", image: categoryHair, count: 12 },
  { id: "gifts", name: "Gifts & Combos", image: categoryGifts, count: 6 },
];

export const products: Product[] = [
  // Lip Care
  {
    id: "lip-gloss-1",
    name: "Rose Petal Lip Gloss",
    price: 89,
    image: categoryLips,
    category: "lips",
    description: "A stunning rose-tinted lip gloss with a beautiful shine. Long-lasting and moisturizing formula.",
    tags: ["bestseller", "new"],
    inStock: true,
  },
  {
    id: "lip-gloss-2",
    name: "Strawberry Kiss Gloss",
    price: 79,
    image: categoryLips,
    category: "lips",
    description: "Sweet strawberry scented lip gloss with a subtle pink tint.",
    inStock: true,
  },
  {
    id: "lip-oil-1",
    name: "Nourishing Lip Oil",
    price: 99,
    image: categoryLips,
    category: "lips",
    description: "Deeply hydrating lip oil infused with vitamin E and rosehip.",
    tags: ["bestseller"],
    inStock: true,
  },
  {
    id: "lip-care-combo",
    name: "Lip Care Combo Set",
    price: 199,
    originalPrice: 250,
    image: categoryLips,
    category: "lips",
    description: "Complete lip care set including gloss, oil, and balm.",
    tags: ["combo", "sale"],
    inStock: true,
  },
  // Body Care
  {
    id: "hand-cream-1",
    name: "Vanilla Dreams Hand Cream",
    price: 69,
    image: categoryBody,
    category: "body",
    description: "Rich and creamy hand cream with a sweet vanilla scent.",
    inStock: true,
  },
  {
    id: "body-mist-1",
    name: "Floral Body Mist",
    price: 129,
    image: categoryBody,
    category: "body",
    description: "Refreshing floral body mist that lasts all day.",
    tags: ["bestseller"],
    inStock: true,
  },
  {
    id: "mini-mist-1",
    name: "Mini Mist Collection (88ml)",
    price: 89,
    image: categoryBody,
    category: "body",
    description: "Travel-friendly mini body mists in 3 lovely scents.",
    tags: ["new"],
    inStock: true,
  },
  {
    id: "pocket-perfume-1",
    name: "Arabic Pocket Perfume (35ml)",
    price: 149,
    image: productPerfume,
    category: "body",
    description: "Luxurious Arabic-inspired pocket perfume.",
    tags: ["luxury"],
    inStock: true,
  },
  {
    id: "mist-lotion-combo",
    name: "Mist + Lotion Combo",
    price: 179,
    originalPrice: 220,
    image: categoryBody,
    category: "body",
    description: "Perfect pairing of body mist and matching lotion.",
    tags: ["combo", "sale"],
    inStock: true,
  },
  {
    id: "face-mask-1",
    name: "Hydrating Face Mask Set",
    price: 89,
    image: categoryBody,
    category: "body",
    description: "Pack of 5 hydrating face masks for glowing skin.",
    inStock: true,
  },
  // Hair Accessories
  {
    id: "bonnet-1",
    name: "Satin Bonnet",
    price: 79,
    image: categoryHair,
    category: "hair",
    description: "Soft satin bonnet to protect your hair while sleeping.",
    tags: ["bestseller"],
    inStock: true,
  },
  {
    id: "string-bonnet-1",
    name: "Adjustable String Bonnet",
    price: 89,
    image: categoryHair,
    category: "hair",
    description: "Adjustable satin bonnet with drawstring closure.",
    inStock: true,
  },
  {
    id: "silk-ties-1",
    name: "Silk Hair Ties Set",
    price: 59,
    image: categoryHair,
    category: "hair",
    description: "Set of 6 gentle silk hair ties in pastel colors.",
    tags: ["new"],
    inStock: true,
  },
  {
    id: "headband-thick-1",
    name: "Double Thick Headband",
    price: 69,
    image: categoryHair,
    category: "hair",
    description: "Comfortable double-thick headband for all hair types.",
    inStock: true,
  },
  {
    id: "scrunchies-1",
    name: "Velvet Scrunchies Pack",
    price: 49,
    image: categoryHair,
    category: "hair",
    description: "Pack of 5 velvet scrunchies in assorted colors.",
    tags: ["bestseller"],
    inStock: true,
  },
  {
    id: "bow-scrunchie-1",
    name: "Scrunchie Bow Set",
    price: 69,
    image: categoryHair,
    category: "hair",
    description: "Adorable bow-style scrunchies, pack of 3.",
    tags: ["new"],
    inStock: true,
  },
  {
    id: "claw-clip-1",
    name: "Beach Flower Claw Clip",
    price: 59,
    image: categoryHair,
    category: "hair",
    description: "Beautiful floral claw clip perfect for summer.",
    inStock: true,
  },
  {
    id: "press-nails-1",
    name: "Press On Nails - Rose Gold",
    price: 119,
    image: productNails,
    category: "hair",
    description: "Stunning rose gold press-on nails, includes glue.",
    tags: ["new"],
    inStock: true,
  },
  // Gifts
  {
    id: "gift-set-1",
    name: "Pamper Gift Box",
    price: 299,
    image: categoryGifts,
    category: "gifts",
    description: "Complete pamper set in a beautiful gift box. Includes lip gloss, hand cream, and body mist.",
    tags: ["bestseller", "gift"],
    inStock: true,
  },
  {
    id: "birthday-set-1",
    name: "Birthday Beauty Bundle",
    price: 399,
    originalPrice: 450,
    image: categoryGifts,
    category: "gifts",
    description: "The perfect birthday gift with a selection of our best products.",
    tags: ["gift", "sale"],
    inStock: true,
  },
  {
    id: "handbag-essentials",
    name: "Handbag Essentials Combo",
    price: 249,
    image: categoryGifts,
    category: "gifts",
    description: "Everything you need in your handbag - mini mist, lip gloss, and hand cream.",
    tags: ["combo", "bestseller"],
    inStock: true,
  },
  {
    id: "lip-lotion-combo",
    name: "Lip Gloss & Lotion Duo",
    price: 159,
    originalPrice: 180,
    image: categoryGifts,
    category: "gifts",
    description: "Perfect duo of lip gloss and matching hand lotion.",
    tags: ["combo", "sale"],
    inStock: true,
  },
];

export const getProductsByCategory = (categoryId: string) => {
  return products.filter((product) => product.category === categoryId);
};

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter((product) => product.tags?.includes("bestseller")).slice(0, 4);
};

export const getNewProducts = () => {
  return products.filter((product) => product.tags?.includes("new")).slice(0, 4);
};
