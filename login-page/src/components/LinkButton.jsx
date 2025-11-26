import React from "react";

export default function LinkButton({ children, onClick, href, className }) {
  if (href) {
    return (
      <a
        href={href}
        className={`text-blue-600 hover:underline focus:outline-none ${
          className || ""
        }`}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}
