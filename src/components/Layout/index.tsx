import { type PropsWithChildren } from "react";
import { Outlet } from "react-router";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {children}
      <Outlet />
    </div>
  );
};

export default Layout;
