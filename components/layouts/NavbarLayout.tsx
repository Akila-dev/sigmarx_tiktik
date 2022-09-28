import React from "react";
import { Navbar, Sidebar } from "../../components";

const NavbarLayout = ({ children }: { children: any }) => {
  return (
    <>
      <div className="fixed container left-1/2 translate-x-[-50%] z-1000">
        <Navbar />
      </div>
      <div className="container flex gap-6 md:gap-16 lg:gap-20 relative pt-[60px]">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1 xl:absolute xl:left-[420px] xl:w-[860px]">
          <div className="w-full">{children}</div>
        </div>
      </div>
      ;
    </>
  );
};

export default NavbarLayout;
