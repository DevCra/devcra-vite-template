import { useRef } from "react";

const useThrottle = <T extends any[]>(
  callback: (...params: T) => void,
  time: number,
): (() => void) => {
  const timer = useRef<number | null>(null);

  return (...params: T) => {
    if (!timer.current) {
      timer.current = window.setTimeout(() => {
        callback(...params);
        timer.current = null;
      }, time);
    }
  };
};

export default useThrottle;
