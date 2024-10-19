"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/dashboard/orders" },
  { name: "Products", href: "/dashboard/products" },
  { name: "Categories", href: "/dashboard/categories" },
];

const DashboardNavigation = () => {
  // get the pathname for the activestyle effect
  const pathname = usePathname();

  console.log(pathname.includes("/products/create"));

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

export default DashboardNavigation;
