import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <Loader2 className="w-6 h-6 text-[#CCFF00] animate-spin" />
  </div>
);