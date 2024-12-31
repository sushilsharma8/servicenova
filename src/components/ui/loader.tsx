// src/components/ui/loader.tsx
import React from "react";

const Loader: React.FC<{ size?: "sm" | "md" | "lg" }> = ({ size = "md" }) => {
  const sizeClass =
    size === "sm" ? "h-4 w-4" : size === "lg" ? "h-8 w-8" : "h-6 w-6";

  return (
    <div className={`flex items-center justify-center ${sizeClass}`}>
      <div className="animate-spin rounded-full border-t-2 border-b-2 border-gray-500"></div>
    </div>
  );
};

export default Loader;
