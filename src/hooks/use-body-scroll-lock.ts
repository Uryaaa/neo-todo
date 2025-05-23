"use client";

import { useEffect } from "react";

/**
 * Hook to lock/unlock body scroll when modals are open
 * Prevents background scrolling on mobile devices
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      // Store original body style
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const originalPosition = window.getComputedStyle(document.body).position;
      const originalTop = window.getComputedStyle(document.body).top;
      const originalWidth = window.getComputedStyle(document.body).width;

      // Get current scroll position
      const scrollY = window.scrollY;

      // Lock the body
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.classList.add("modal-open");

      // Cleanup function
      return () => {
        // Restore original styles
        document.body.style.overflow = originalStyle;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        document.body.classList.remove("modal-open");

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isLocked]);

  // Cleanup on unmount to ensure body scroll is always restored
  useEffect(() => {
    return () => {
      // Force cleanup on unmount
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.classList.remove("modal-open");
    };
  }, []);
}
