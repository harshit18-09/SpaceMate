import React from "react";

export default function Loader({ label = "Loading..." , className = ""}) {
  return (
    <div className={`flex items-center justify-center py-6 ${className}`}>
      <div className="inline-flex items-center gap-3">
        <span className="h-6 w-6 rounded-full border-2 border-gray-300 border-t-blue-600 animate-spin" />
        <span className="text-sm text-gray-600">{label}</span>
      </div>
    </div>
  );
}
