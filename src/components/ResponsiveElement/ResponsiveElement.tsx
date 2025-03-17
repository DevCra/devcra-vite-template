import { type ReactNode } from "react";

import { useIsMobile } from "@/hooks/common";

interface Props {
  desktop: ReactNode;
  mobile: ReactNode;
}

const ResponsiveElement = ({ desktop, mobile }: Props) => {
  const isMobile = useIsMobile();

  return isMobile ? mobile : desktop;
};

export default ResponsiveElement;
