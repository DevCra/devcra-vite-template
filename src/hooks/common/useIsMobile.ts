import { useViewportRect } from "@/contexts/viewport-provider";

const MOBILE_BREAKPOINT = 1024;

const useIsMobile = () => {
  const { resolutionWidth } = useViewportRect();
  const isMobile = resolutionWidth < MOBILE_BREAKPOINT;

  return isMobile;
};

export default useIsMobile;
