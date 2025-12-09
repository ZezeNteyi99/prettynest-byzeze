import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface OrderConfirmationRequest {
  orderId: string;
  email: string;
  firstName: string;
  lastName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  address: string;
  city: string;
  postalCode: string;
  province: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Order confirmation function called");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: OrderConfirmationRequest = await req.json();
    console.log("Order data received:", JSON.stringify(orderData));

    const itemsHtml = orderData.items.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #f0e6e8;">
          <strong>${item.name}</strong>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #f0e6e8; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #f0e6e8; text-align: right;">
          R${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `).join('');

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
            <div style="padding: 40px 30px;">
              <h2 style="color: #2d2d2d; margin: 0 0 8px 0; font-size: 24px; font-weight: normal;">
                Thank you for your order, ${orderData.firstName}!
              </h2>
              <p style="color: #666666; margin: 0 0 30px 0; font-size: 16px;">
                Your order <strong style="color: #d4a5a5;">#${orderData.orderId.slice(0, 8).toUpperCase()}</strong> has been confirmed.
              </p>
              
              <!-- Order Items -->
              <div style="background-color: #fdf8f9; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <h3 style="color: #2d2d2d; margin: 0 0 16px 0; font-size: 18px;">Order Summary</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f5e1e4;">
                      <th style="padding: 12px; text-align: left; color: #2d2d2d; font-weight: 600;">Item</th>
                      <th style="padding: 12px; text-align: center; color: #2d2d2d; font-weight: 600;">Qty</th>
                      <th style="padding: 12px; text-align: right; color: #2d2d2d; font-weight: 600;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
                
                <div style="margin-top: 20px; padding-top: 16px; border-top: 2px solid #e8c4c4;">
                  <table style="width: 100%;">
                    <tr>
                      <td style="color: #666666; padding: 4px 0;">Subtotal:</td>
                      <td style="color: #2d2d2d; text-align: right; padding: 4px 0;">R${orderData.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style="color: #666666; padding: 4px 0;">Shipping:</td>
                      <td style="color: #2d2d2d; text-align: right; padding: 4px 0;">R${orderData.shipping.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style="color: #2d2d2d; font-size: 18px; font-weight: bold; padding: 8px 0;">Total:</td>
                      <td style="color: #d4a5a5; font-size: 18px; font-weight: bold; text-align: right; padding: 8px 0;">R${orderData.total.toFixed(2)}</td>
                    </tr>
                  </table>
                </div>
              </div>
              
              <!-- Shipping Address -->
              <div style="background-color: #fdf8f9; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <h3 style="color: #2d2d2d; margin: 0 0 12px 0; font-size: 18px;">Shipping Address</h3>
                <p style="color: #666666; margin: 0; line-height: 1.6;">
                  ${orderData.firstName} ${orderData.lastName}<br>
                  ${orderData.address}<br>
                  ${orderData.city}, ${orderData.province} ${orderData.postalCode}
                </p>
              </div>
              
              <p style="color: #666666; text-align: center; font-size: 14px; margin: 0;">
                Questions? Reply to this email or contact us via WhatsApp at +27 61 287 3693
              </p>
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
        to: [orderData.email],
        subject: `Order Confirmed! #${orderData.orderId.slice(0, 8).toUpperCase()}`,
        html: emailHtml,
      }),
    });

    const emailResponse = await response.json();
    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending order confirmation:", error);
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
