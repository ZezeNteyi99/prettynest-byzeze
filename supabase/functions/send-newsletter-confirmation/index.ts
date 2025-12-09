import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Newsletter confirmation function called");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterRequest = await req.json();
    console.log("Sending newsletter confirmation to:", email);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Georgia', serif; background-color: #fdf8f9; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #d4a5a5 0%, #e8c4c4 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: normal;">
                PrettyNest <span style="font-size: 14px; display: block; margin-top: 4px;">by Zeze</span>
              </h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px; text-align: center;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #d4a5a5 0%, #e8c4c4 100%); border-radius: 50%; margin: 0 auto 24px; line-height: 80px;">
                <span style="font-size: 36px;">💌</span>
              </div>
              
              <h2 style="color: #2d2d2d; margin: 0 0 16px 0; font-size: 28px; font-weight: normal;">
                Welcome to the Nest!
              </h2>
              
              <p style="color: #666666; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
                Thank you for subscribing to our newsletter! You're now part of our beautiful community.
              </p>
              
              <div style="background-color: #fdf8f9; border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: left;">
                <p style="color: #2d2d2d; margin: 0 0 16px 0; font-size: 16px;">
                  As a subscriber, you'll be the first to know about:
                </p>
                <ul style="color: #666666; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>New product launches & restocks</li>
                  <li>Exclusive discounts & offers</li>
                  <li>Beauty tips & tutorials</li>
                  <li>Special giveaways</li>
                </ul>
              </div>
              
              <a href="https://prettynest.com/shop" style="display: inline-block; background: linear-gradient(135deg, #d4a5a5 0%, #c99595 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-size: 16px; font-weight: 500;">
                Start Shopping
              </a>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #2d2d2d; padding: 24px; text-align: center;">
              <p style="color: #d4a5a5; margin: 0 0 8px 0; font-size: 14px;">
                Because you deserve something beautiful ✨
              </p>
              <p style="color: #888888; margin: 0; font-size: 12px;">
                © ${new Date().getFullYear()} PrettyNest by Zeze. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "PrettyNest <onboarding@resend.dev>",
        to: [email],
        subject: "Welcome to PrettyNest! 💕",
        html: emailHtml,
      }),
    });

    const emailResponse = await response.json();
    console.log("Newsletter confirmation sent:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending newsletter confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
