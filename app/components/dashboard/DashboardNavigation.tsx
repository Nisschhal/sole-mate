import Link from "next/link";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/dashboard/orders" },
  { name: "Products", href: "/dashboard/product" },
  { name: "Categories", href: "/dashboard/categories" },
];

const DashboardNavigation = () => {
  return (
    <>
      {links.map((link, index) => (
        <Link key={index} href={link.href}>
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default DashboardNavigation;
