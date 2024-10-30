import React, { ReactNode } from "react";
import { Navbar } from "./Navbar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default layout;
