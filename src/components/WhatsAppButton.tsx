import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "27612873693";
const DEFAULT_MESSAGE = "Hi! I'm interested in PrettyNest products 💕";

export const WhatsAppButton = () => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(DEFAULT_MESSAGE);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 fill-current" />
    </button>
  );
};
