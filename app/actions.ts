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

  // upload the form data to db server
  await prisma.product.create({
    data: {
      id: uuidv4(),
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: submission.value.images,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured,
    },
  });

  redirect("/dashboard/products");
}
