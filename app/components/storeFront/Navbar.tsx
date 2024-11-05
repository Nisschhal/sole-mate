import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";

export function Navbar() {
  return (
    <div className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      <div className="flex items-center">
        <Link href={"/"}>
          <h1 className="text-black font-bold text-xl lg:text-3xl">
            Sole<span className="text-primary">Mate</span>
          </h1>
        </Link>
        <NavbarLinks />
      </div>
    </div>
  );
}
