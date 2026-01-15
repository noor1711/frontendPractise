import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export default function ModalDialog({ children, title, isOpen, close }) {
  if (!isOpen) {
    return null;
  }

  const parentRef = React.useRef();
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, close]);

  const handleKeyDown = useCallback((ev) => {
    if (ev.key !== "Tab") return;

    const focusable = parentRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (ev.shiftKey && document.activeElement === first) {
      ev.preventDefault(); // Only prevent default during the "jump"
      last.focus();
    } else if (!ev.shiftKey && document.activeElement === last) {
      ev.preventDefault(); // Only prevent default during the "jump"
      first.focus();
    }
    // Otherwise, let the browser handle the Tab naturally!
  }, []);

  return createPortal(
    <div
      onKeyDown={handleKeyDown}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "300px",
        }}
        ref={parentRef}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2> {title} </h2>
          <button onClick={close}>Close</button>
        </div>
        <div> {children} </div>
        <button></button>
      </div>
    </div>,
    document.body
  );
}
