"use client";

import { type PropsWithChildren, createContext, useContext, useSyncExternalStore } from "react";

import { useHasMounted } from "@/hooks/common";

type Rect = Pick<DOMRect, "top" | "left"> & {
  resolutionWidth: number;
  resolutionHeight: number;
  scrollWidth: number;
  scrollHeight: number;
};

const DefaultRect: Rect = {
  top: 0,
  left: 0,
  resolutionWidth: 0,
  resolutionHeight: 0,
  scrollWidth: 0,
  scrollHeight: 0,
};

const rectKeys: (keyof Rect)[] = [
  "top",
  "left",
  "resolutionWidth",
  "resolutionHeight",
  "scrollWidth",
  "scrollHeight",
];

const isSameRect = (prev: Rect, next: Rect) => {
  return rectKeys.every((k) => prev?.[k] === next?.[k]);
};

const getViewportRect = () => {
  let stored: Rect = DefaultRect;
  return () => {
    const elem = typeof document !== "undefined" && document.scrollingElement;
    if (!elem) return stored;

    const { top, left } = elem.getBoundingClientRect();
    const newRect: Rect = {
      top,
      left,
      resolutionWidth: window.innerWidth,
      resolutionHeight: window.innerHeight,
      scrollWidth: elem.scrollWidth,
      scrollHeight: elem.scrollHeight,
    };

    if (newRect && !isSameRect(stored, newRect)) {
      stored = newRect;
    }
    return stored;
  };
};

const subscribe = (callback: () => void) => {
  const resizeObserver = new ResizeObserver(callback);

  window.addEventListener("scroll", callback);
  resizeObserver.observe(document.body);

  return () => {
    window.removeEventListener("scroll", callback);
    resizeObserver.disconnect();
  };
};

const ViewportContext = createContext<Rect>(DefaultRect);

const ViewportContextProvider = ({ children }: PropsWithChildren) => {
  const hasMounted = useHasMounted();

  const viewportRect = useSyncExternalStore(subscribe, getViewportRect(), () => DefaultRect);

  if (!hasMounted) {
    return null;
  }

  return <ViewportContext.Provider value={viewportRect}>{children}</ViewportContext.Provider>;
};
export default ViewportContextProvider;

export const useViewportRect = () => useContext(ViewportContext);
