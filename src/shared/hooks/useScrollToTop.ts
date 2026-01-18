"use client";

import { useState, useEffect, useCallback } from "react";

interface UseScrollToTopOptions {
  threshold?: number;
  behavior?: ScrollBehavior;
}

export function useScrollToTop({
  threshold = 300,
  behavior = "smooth",
}: UseScrollToTopOptions = {}) {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior });
  }, [behavior]);

  return {
    showScrollBtn,
    scrollToTop,
  };
}
