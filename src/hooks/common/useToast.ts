import { useCallback, useState } from "react";

const useToast = () => {
  const [message, setMessage] = useState("");

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
  }, []);

  const closeToast = useCallback(() => {
    setMessage("");
  }, []);

  return { message, showToast, closeToast };
};

export default useToast;
