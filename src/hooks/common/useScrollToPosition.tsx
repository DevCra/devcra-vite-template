import { useRef } from "react";

const useScrollToPosition = <T extends HTMLElement>(
  positionType: "LEFT" | "RIGHT" | "TOP" | "BOTTOM",
) => {
  const containerRef = useRef<T | null>(null);

  const scrollToEnd = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    switch (positionType) {
      case "LEFT":
        container.scrollLeft = 0;
        break;
      case "RIGHT":
        container.scrollLeft = container.scrollWidth;
        break;
      case "TOP":
        container.scrollTop = 0;
        break;
      case "BOTTOM":
        container.scrollTop = container.scrollHeight;
    }
  };

  return { containerRef, scrollToEnd };
};

export default useScrollToPosition;
