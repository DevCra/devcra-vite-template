import { type PropsWithChildren } from "react";
import { Outlet } from "react-router";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

export default Layout;
