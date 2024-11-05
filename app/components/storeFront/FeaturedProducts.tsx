import prisma from "@/app/lib/db";
import { ProductCard } from "./ProductCard";

async function getData() {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function FeaturedProducts() {
  const featuredProducts = await getData();
  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight ">
        Featured Products
      </h1>

      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {featuredProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
