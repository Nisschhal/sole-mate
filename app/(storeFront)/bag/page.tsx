import { deleteItem } from "@/app/actions";
import { DeleteItemButton } from "@/app/components/SubmitButtons";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function BagRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // redirect to index page if not authenticated
  if (!user) {
    redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);
  let totalAmount: number = 0;

  if (cart) {
    totalAmount = cart?.items.reduce(
      (acc, item) => item.price * item.quantity + acc,
      0
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
      {cart?.items.length === 0 ? (
        <div>
          <h1>Nothing in the Shopping Bag!</h1>
        </div>
      ) : (
        <div className="flex flex-col gap-y-10">
          {cart?.items.map((item) => (
            // Cart Item
            <div key={item.id} className="flex">
              {/* Image */}
              <div className="size-24 sm:size-32 relative">
                <Image
                  className="rounded-md object-cover"
                  src={item.imageString}
                  alt="Product Image"
                  fill
                />
              </div>
              {/* Description : Name --> Price | Action */}
              <div className="ml-5 flex justify-between w-full font-medium">
                <p>{item.name}</p>
                {/* Quantity x Price and Action */}
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-x-2">
                    <p>{item.quantity} x</p>
                    <p>${item.price}</p>
                  </div>
                  {/* Delete */}
                  <form action={deleteItem} className="text-end">
                    <input type="hidden" name="productId" value={item.id} />
                    <DeleteItemButton />
                  </form>
                </div>
              </div>
            </div>
          ))}
          {/* Total Amount for Cart Items */}
          <div className="mt-5">
            <div className="flex items-center justify-between font-medium">
              <p>Subtotal:</p>
              <p className="pr-3">
                ${new Intl.NumberFormat("en-Us").format(totalAmount)}
              </p>
            </div>
            {/* Chckout button */}
            <Button className="w-full mt-5" size={"lg"}>
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
