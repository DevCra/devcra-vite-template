import { useEffect, useState } from "react";

import { useViewportRect } from "@/contexts/viewport-provider";

export type ScrollOptions = { level: number; scale: number };
type Transforms = Array<{ [key in "transform" | "opacity"]: string }>;

const useScrollEffect = (scrollOptions: ScrollOptions, isActive: boolean) => {
  const { top: scrollTop } = useViewportRect();
  const [transforms, setTransforms] = useState<Transforms>([]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const { level, scale } = scrollOptions;
    const scrollY = -scrollTop;

    const newTransforms = Array.from({ length: level }).map((_, idx) => ({
      transform: `translateY(${scrollY * (scale * (level + 1))}px)`,
      opacity: `${Math.max(0, 1 - scrollY / (100 * (idx + 1)))}`,
    }));

    setTransforms(newTransforms);
  }, [scrollOptions, isActive, scrollTop]);

  return transforms;
};

export default useScrollEffect;
