import { addItem } from "@/app/actions";
import FeaturedProducts from "@/app/components/storeFront/FeaturedProducts";
import { ImageSlider } from "@/app/components/storeFront/ImageSlider";
import { ShoppingBagButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { ShoppingBag, StarIcon } from "lucide-react";
import { notFound } from "next/navigation";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
    },
  });

  if (!data) return notFound();

  return data;
}
export default async function ProductIdRoute({
  params,
}: {
  params: { id: string };
}) {
  const productDetails = await getData(params.id);
  const addProductToCart = addItem.bind(null, params.id);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={productDetails.images} />

        {/* Col 2 : Image Description */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {productDetails.name}
          </h1>
          <p className="text-3xl mt-2 text-gray-900">${productDetails.price}</p>
          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="size-4 text-yellow-500 fill-yellow-500 " />
            <StarIcon className="size-4 text-yellow-500 fill-yellow-500 " />
            <StarIcon className="size-4 text-yellow-500 fill-yellow-500 " />
            <StarIcon className="size-4 text-yellow-500 fill-yellow-500 " />
            <StarIcon className="size-4 text-yellow-500 fill-yellow-500 " />
          </div>
          <p className="text-base text-gray-700 mt-6">
            {productDetails.description}
          </p>

          <form action={addProductToCart}>
            <ShoppingBagButton />
          </form>
        </div>
      </div>

      {/* Featured Products */}
      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
