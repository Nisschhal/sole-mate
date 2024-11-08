"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productSchema } from "./lib/zodSchema";
import prisma from "./lib/db";
import { v4 as uuidv4 } from "uuid"; // Import UUID library
import { redis } from "./lib/redis";
import { Cart } from "./lib/interfaces";
import { revalidatePath } from "next/cache";
import { stripe } from "./lib/stripte";
import Stripe from "stripe";

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
  const productId = formData.get("id") as string;
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
  const productId = formData.get("id") as string;
  console.log("clidked");
  // update the product with given formdata
  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  redirect("/dashboard/products");
}

// Create Banner
export async function createBanner(_: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user) return redirect("/");

  // validate formdata
  const submission = parseWithZod(formData, { schema: bannerSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // store the banner
  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect("/dashboard/banner");
}

// delete banner  action
export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // if there is no user who has entered then redirect to homepage
  if (!user) {
    return redirect("/");
  }

  // get the bannerId from formData
  const bannerId = formData.get("id") as string;
  console.log("clidked");
  // update the product with given formdata
  await prisma.banner.delete({
    where: {
      id: bannerId,
    },
  });

  redirect("/dashboard/banner");
}

// CART ADD ITEM
export async function addItem(productId: string) {
  // if no user, redirect to indexpage
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }
  // get the cart with specific id
  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  // get the productbyId from the db to add into cart
  const selectedProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
  });

  // if there isn ot such product throw error "No product with that id"
  if (!selectedProduct) throw new Error("No product with this id!");

  // create empty cart for new cart
  let myCart = {} as Cart;

  // if there is no cart with specified userId create new one
  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          id: selectedProduct.id,
          price: selectedProduct.price,
          imageString: selectedProduct.images[0],
          name: selectedProduct.name,
          quantity: 1,
        },
      ],
    };
  } else {
    // if there is already cart then just increase the quantity by 1
    let itemFound = false;

    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }

      return item;
    });

    myCart.userId = user.id;

    // there is cart but not that item in it than add new item {} into cart
    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        imageString: selectedProduct.images[0],
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: 1,
      });
    }
  }

  // push the new or updated cart item to redis
  await redis.set(`cart-${user.id}`, myCart);

  // next.js caches and provide previous data to frontend when re-fetched so, revalidate the cache to get up-to-date value
  // revalidate the indexpage layout
  revalidatePath("/", "layout");
}

// Delete Cart Item
export async function deleteItem(formData: FormData) {
  // if no user, redirect to indexpage
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }
  // get the productbyId to find that particular item
  const productId = formData.get("productId");

  // get the cart with specific id
  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updatedCart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };
    const res = await redis.set(`cart-${user.id}`, updatedCart);

    console.log(res);
  }

  revalidatePath("/bag");
}

//Checkout Process

/**
 * 1. Get the User for its id
 * 2. Get the User's Cart from redis
 * 3. Check the cart for items and create stripe line_items[] of price_data and its details
 * 4. Setup the Stripe session with mode: payment, setup, subscribe || line_items || success && cancel url || metadata of userId
 * 5. return the redirect(session.url)
 * @returns STRING ==> Redirect URL: success_url || cancel_url
 */
export async function checkOut() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100, // in Cents
          product_data: {
            name: item.name,
            images: [item.imageString],
          },
        },
        quantity: item.quantity,
      }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/payment/success"
          : "https://sole-mate-dev-nisal.vercel.app/payment/success",
      cancel_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/payment/success"
          : "https://sole-mate-dev-nisal.vercel.app/payment/cancel",
      metadata: {
        userId: user.id,
      },
    });

    return redirect(session.url as string);
  }
}
