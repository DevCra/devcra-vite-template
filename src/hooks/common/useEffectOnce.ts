import { useEffect, useRef } from "react";

const useEffectOnce = (callback: () => void) => {
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) {
      return;
    }

    ref.current = true;

    if (typeof callback === "function") {
      callback();
    }
  }, [callback]);
};

export default useEffectOnce;
