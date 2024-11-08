import React, { ReactNode } from "react";
import DashboardNavigation from "../components/dashboard/DashboardNavigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleUser, MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  // Get the user from the kinde auth
  const { getUser } = getKindeServerSession();
  // extract the user
  const user = await getUser();
  // If no user go to index page:Hdme page
  if (!user) {
    return redirect("/");
  }

  return (
    <div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* HEADER WITH STICKY nav */}
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white">
        {/* DESKTOP: nav */}
        <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <DashboardNavigation />
        </nav>

        {/* MOBILE: nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="shrink-0 md:hidden ml-auto">
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-6 text-lg font-medium mt-5">
              <DashboardNavigation />
            </nav>
          </SheetContent>
        </Sheet>

        {/* AVATAR WITH DROPDOWN: Account  || Logout */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src={user.picture as string} alt="profile pic" />
                <AvatarFallback>
                  <CircleUser className="size-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <LogoutLink>Logout</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="my-5">{children}</main>
    </div>
  );
};

export default DashboardLayout;
