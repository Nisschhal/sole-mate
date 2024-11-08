import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

// export async function GET() {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   // if no user throw error
//   if (!user || user == null || !user.id) {
//     throw new Error("Something went wrong in user auth creation...");
//   }

//   // check if user exist with the id
//   let dbUser = await prisma.user.findUnique({
//     where: {
//       id: user.id,
//     },
//   });

//   // if doesn't, create a new user
//   if (!dbUser) {
//     dbUser = await prisma.user.create({
//       data: {
//         id: user.id,
//         firstName: user.given_name ?? "",
//         lastName: user.family_name ?? "",
//         email: user.email ?? "",
//         profileImage:
//           user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
//       },
//     });
//   }

//   // return to the given url, url must be absolute path
//   return NextResponse.redirect("http://localhost:3000");
// }

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // Log the user object for debugging purposes
    console.log(user);

    // if no user, throw error
    if (!user || !user.id) {
      throw new Error("Something went wrong in user auth creation...");
    }

    // check if user exists in the database
    let dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

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

    // return the response
    return NextResponse.redirect("http://localhost:3000");
  } catch (error) {
    console.error("Error during API call:", error); // Log any error that occurs
    throw new Error(
      "An error occurred during user creation or authentication."
    );
  }
}
