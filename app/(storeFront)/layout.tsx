import React, { ReactNode } from "react";
import { Navbar } from "../components/storeFront/Navbar";
// import { Navbar } from "./Navbar";

const StoreFrontLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* <Navbar /> */}
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
    </>
  );
};

export default StoreFrontLayout;
