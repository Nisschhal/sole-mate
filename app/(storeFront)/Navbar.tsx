const links = [
  { id: 0, link: "Home", href: "/" },
  {
    id: 1,
    link: "Men",
    href: "/men",
  },
  {
    id: 2,
    link: "Women",
    href: "/women",
  },
];

export const Navbar = () => {
  return (
    <div>
      <h1>
        Sole
        <span className="text-2xl font-medium bg-gradient-to-r from-indigo-500 to-blue-500 text-transparent bg-clip-text">
          Mate
        </span>
      </h1>
    </div>
  );
};
