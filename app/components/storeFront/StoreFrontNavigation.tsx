"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "All Products", href: "/products/all" },
  { name: "Men", href: "/products/men" },
  { name: "Women", href: "/products/women" },
  { name: "Kids", href: "/products/kids" },
];

const StoreFrontNavigation = () => {
  // get the pathname for the activestyle effect
  const pathname = usePathname();

  return (
    <>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`${
            link.href == pathname ||
            (pathname.includes("/create") && link.name == "Products")
              ? "text-foreground"
              : "text-muted-foreground"
          } hover:text-foreground transition duration-200`}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default StoreFrontNavigation;
