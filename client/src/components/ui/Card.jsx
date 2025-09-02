import React from "react";

export default function Card({
  title,
  subtitle,
  actions,
  children,
  className = "",
}) {
  return (
    <div className={`bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition ${className}`}>
      {(title || actions || subtitle) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
      )}
      {children}
    </div>
  );
}
