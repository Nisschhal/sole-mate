import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";

export async function Navbar() {
  // get the user and get the cart from that user, if there is any
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let cart: Cart | null;
  let totalQuanity: number | undefined;
  if (user) {
    cart = await redis.get(`cart-${user.id}`);
    totalQuanity = cart?.items.reduce((acc, item) => item.quantity + acc, 0);
  }

  return (
    <div className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      <div className="flex items-center">
        <Link href={"/"}>
          <h1 className="text-black font-bold text-xl lg:text-3xl">
            Sole<span className="text-primary">Mate</span>
          </h1>
        </Link>
        <NavbarLinks />
      </div>

      {/* Show shopping bag and user dropdown if logged in, otherwise show login prompt */}
      <div className="flex items-center">
        {user ? (
          <>
            <Link href={"/bag"} className="group p-2 flex items-center mr-2">
              <ShoppingBagIcon className="size-6 text-gray-400 group-hover:text-gray-500" />
              <span className="ml-1 text-sm font-medium text-gray-700">
                {totalQuanity}
              </span>
            </Link>

            <UserDropdown
              email={user.email as string}
              name={user.given_name as string}
              userImage={
                user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
              }
            />
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button variant={"outline"} asChild>
              <LoginLink>Sign in</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-200"> </span>
            <Button variant={"ghost"} asChild>
              <RegisterLink>Create Account</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
