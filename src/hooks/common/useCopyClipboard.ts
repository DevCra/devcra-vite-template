import { useState } from "react";

type onCopyFn = (text: string) => Promise<boolean>;

const useCopyClipboard = (): [boolean, onCopyFn] => {
  const [isCopy, setIsCopy] = useState(false);
  const onCopy: onCopyFn = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("복사되었습니다.");
      setIsCopy(true);
      return true;
    } catch (error) {
      console.error(error);
      setIsCopy(false);
      return false;
    }
  };
  return [isCopy, onCopy];
};

export default useCopyClipboard;
