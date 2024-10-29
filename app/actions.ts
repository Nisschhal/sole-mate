"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "./lib/zodSchema";
import prisma from "./lib/db";
import { v4 as uuidv4 } from "uuid"; // Import UUID library

// server createProduct function to pass at useFormState()
export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // if there is no user who has entered then redirect to homepage
  if (!user) {
    return redirect("/");
  }

  // give the incoming data to conform/Zod to validate
  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  // if not validate pass to useActionState
  if (submission.status !== "success") {
    return submission.reply();
  }

  // flatten the incoming string of imageUrl from uploadthing
  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  // upload the form data to db server
  await prisma.product.create({
    data: {
      id: uuidv4(),
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured,
    },
  });

  redirect("/dashboard/products");
}

// edit product detail action
export async function editProduct(_: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // if there is no user who has entered then redirect to homepage
  if (!user) {
    return redirect("/");
  }

  // give the incoming data to conform/Zod to validate
  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") return submission.reply();

  // get the productId from formData
  const productId = formData.get("productId") as string;
  console.log("form data", formData);

  // flatten the incoming string of imageUrl from uploadthing
  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  // update the product with given formdata
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured,
    },
  });

  redirect("/dashboard/products");
}
// delete product detail action
export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // if there is no user who has entered then redirect to homepage
  if (!user) {
    return redirect("/");
  }

  // get the productId from formData
  const productId = formData.get("productId") as string;
  console.log("clidked");
  // update the product with given formdata
  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  redirect("/dashboard/products");
}