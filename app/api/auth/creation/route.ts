import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  // don't cache this page
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // if no user throw error
  if (!user || user == null || !user.id) {
    throw new Error("Something went wrong in user auth creation...");
  }

  // check if user exist with the id
  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  // if doesn't, create a new user
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "",
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
      },
    });
  }

  // return to the given url, url must be absolute path
  return NextResponse.redirect("http://localhost:3000");
}
