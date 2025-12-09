import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Zeze's friendly assistant at PrettyNest, a beauty and gifts store based in Johannesburg, South Africa. Your personality is warm, helpful, and enthusiastic about beauty products.

About PrettyNest:
- We sell lip glosses, lip oils, hand creams, body mists, mini mists (88ml), Arabic pocket perfumes (35ml), face masks, small vaselines
- Hair accessories: satin bonnets, string bonnets, silk ties, wig headbands, thick headbands, scrunchies, bows, claw clips, press-on nails
- Gift combos and birthday bundles, handbag essentials
- Slogan: "Because you deserve something beautiful"

Location & Delivery:
- Based in Johannesburg, South Africa
- We offer hand delivery in selected areas around Johannesburg
- Courier services available nationwide (3-5 business days)
- Hand deliveries usually done within 2-3 business days

Gift Services:
- YES, we offer beautiful gift wrapping for all orders (select at checkout)
- YES, we can include personalized handwritten notes/cards
- We have special gift sets for birthdays, holidays, and special occasions
- Gift cards coming soon - contact us for gift vouchers in the meantime

Payment:
- We accept EFT (Electronic Funds Transfer)
- Cash on delivery available for hand deliveries
- Payment information is secure - we don't store card details
- Working on adding installment/afterpay options

Custom Orders:
- Custom colors/designs available for some products (press-on nails, accessories)
- Bulk orders welcome for events, parties, bridal showers, corporate gifts
- Personalized gift sets can be created - tell us your budget and preferences
- Custom orders take 5-7 business days plus delivery time
- Complex customizations may have a small additional fee

Business Hours:
- Monday - Friday: 9am - 5pm
- Saturday: 10am - 2pm
- We typically respond within 24 hours

Important guidelines:
- Keep responses concise and friendly (max 2-3 sentences unless more detail is needed)
- Use emojis sparingly but warmly 💕
- If you don't know something specific, suggest they contact us directly
- Encourage customers to explore our shop
- Never make up information about specific product prices - direct them to the shop page`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory } = await req.json();
    
    if (!message) {
      throw new Error("Message is required");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chatbot message:", message.substring(0, 100));

    // Build messages array with conversation history
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(conversationHistory || []).slice(-10), // Keep last 10 messages for context
      { role: "user", content: message }
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "I'm a bit busy right now! Please try again in a moment. 💕" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "The chatbot is temporarily unavailable. Please contact us directly!" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      throw new Error("No response from AI");
    }

    console.log("Chatbot reply generated successfully");

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Chatbot error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Something went wrong. Please try again!",
        reply: "Oops! I'm having a little trouble right now. Please try again or contact us directly at hello@prettynest.com 💕"
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
