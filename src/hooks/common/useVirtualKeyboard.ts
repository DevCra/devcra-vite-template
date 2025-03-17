import { useEffect } from "react";

const useVirtualKeyboard = () => {
  // 가상 키보드 올라올 때 이벤트
  useEffect(() => {
    if (!visualViewport) {
      return;
    }

    const handleResizeByVirtualKeyboard = () => {
      if (!visualViewport) {
        return;
      }

      document.body.style.height = `${visualViewport.height}px`;
    };

    visualViewport.onresize = handleResizeByVirtualKeyboard;
  }, []);

  // Prevent scroll
  useEffect(() => {
    const preventScroll = () => {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.body.scrollIntoView({ behavior: "instant" });
    };

    window.addEventListener("scroll", preventScroll, {
      passive: false,
    });
    window.addEventListener("scrollend", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, {
      passive: false,
    });

    return () => {
      window.removeEventListener("scroll", preventScroll);
      window.removeEventListener("scrollend", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, []);
};

export default useVirtualKeyboard;
