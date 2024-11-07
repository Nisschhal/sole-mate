"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
  { id: 0, name: "Home", href: "/" },
  { id: 1, name: "All Products", href: "/products/all" },
  { id: 2, name: "Men", href: "/products/men" },
  { id: 3, name: "Women", href: "/products/women" },
  { id: 4, name: "Kids", href: "/products/kids" },
];

// hidden on mobile but shoe in tablet and above
export function NavbarLinks() {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex justify-center items-center gap-x-4  ml-8">
      {navbarLinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={`${
            pathname == item.href
              ? "bg-muted underline underline-offset-4 drop-shadow-md"
              : "hover:bg-muted bg-opacity-75 hover:underline hover:underline-offset-4"
          } p-2 rounded-sm  transition duration-200`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
