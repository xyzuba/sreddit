import React from "react";
import { NavBar } from "./NavBar";
import { Wrapper, WrapperVariarnt } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariarnt;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
