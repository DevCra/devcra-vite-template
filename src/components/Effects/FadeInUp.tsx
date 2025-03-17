import clsx from "clsx";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";

import useIntersectionObserver, { DEFAULT_IO_OPTION } from "@/hooks/common/useIntersectionObserver";

interface Props extends PropsWithChildren {
  ioOption?: IntersectionObserverInit;
  className?: string;
}

const FadeInUp = ({ ioOption = DEFAULT_IO_OPTION, className, children }: Props) => {
  const [isVisible, setVisible] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { entries } = useIntersectionObserver(wrapperRef, ioOption);

  useEffect(() => {
    if (entries.length === 0) {
      return;
    }

    if (entries[0].isIntersecting) {
      setVisible(true);
    }
  }, [entries]);

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        "transition-all duration-1000 ease-out will-change-[opacity,visibility]",
        {
          "invisible translate-y-1/4 opacity-0": !isVisible,
          "visible translate-y-0 opacity-100": isVisible,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

export default FadeInUp;
