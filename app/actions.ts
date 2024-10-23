"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "./lib/zodSchema";

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
}
