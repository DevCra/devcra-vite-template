import { useCallback, useState } from "react";

const useFullScreen = () => {
  const [isFullScreen, setFullScreen] = useState(false);

  const handleFullScreenToggle = useCallback(() => {
    const isNewFullScreen = !isFullScreen;

    setFullScreen(isNewFullScreen);

    if (isNewFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [isFullScreen]);

  return {
    handleFullScreenToggle,
  };
};

export default useFullScreen;
