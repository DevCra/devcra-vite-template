import { type RefObject, useEffect, useRef, useState } from "react";

type Elem = HTMLElement | null;

export const DEFAULT_IO_OPTION: IntersectionObserverInit = { threshold: 0 };

const useIntersectionObserver = (
  elemRef: RefObject<Elem | Elem[]>,
  options: IntersectionObserverInit = DEFAULT_IO_OPTION,
) => {
  const observerRef = useRef<IntersectionObserver>(null);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    const node = elemRef.current;

    if (!node) {
      return;
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      setEntries((prev) => {
        return Array.from(new Map(prev.concat(entries).map((e) => [e.target, e])).values()).filter(
          (e) => e.isIntersecting,
        );
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    observerRef.current = observer;

    if (Array.isArray(node)) {
      node.forEach((n) => n && observer.observe(n));
    } else {
      observer.observe(node);
    }

    return () => {
      observer?.disconnect();
    };
  }, [elemRef, options]);

  return {
    entries,
    observerRef,
  };
};

export default useIntersectionObserver;
