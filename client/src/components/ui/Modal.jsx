import React, { useEffect } from "react";
import Button from "./Button";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  showClose = true,
  actions,
  size = "md", // md | lg | xl
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxW = {
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }[size];

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={`w-full ${maxW} bg-white rounded-2xl shadow-xl border border-gray-200`}
          onClick={(e) => e.stopPropagation()}
        >
          {(title || showClose) && (
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              {showClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Close"
                  onClick={onClose}
                  className="rounded-full"
                >
                  ✕
                </Button>
              )}
            </div>
          )}

          <div className="px-5 py-4">{children}</div>

          {actions && (
            <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
