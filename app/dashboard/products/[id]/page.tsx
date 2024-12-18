import EditForm from "@/app/components/EditForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

//  get the product Details with incoming data
const getProductDetails = async (id: string) => {
  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!data) return notFound();

  return data;
};

const EditRoute = async ({ params }: { params: { id: string } }) => {
  // don't cache this page
  noStore();
  const productDetails = await getProductDetails(params.id);
  return (
    <div>
      <EditForm productDetails={productDetails} />
    </div>
  );
};

export default EditRoute;
