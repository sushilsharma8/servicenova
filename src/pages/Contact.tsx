import { CallbackRequest } from "@/components/CallbackRequest";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => navigate('/')} />
        
        <div className="relative w-full max-w-md">
          <Card className="bg-[#0A0A0A] shadow-xl ring-1 ring-white/10 p-8">
            <button
              onClick={() => navigate('/')}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white">
                  Request a Call Back
                </h2>
                <p className="mt-2 text-gray-400">
                  Leave your details and we'll contact you shortly
                </p>
              </div>
              <CallbackRequest />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact; 