import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { stripe } from "@/app/lib/stripte";
import { headers } from "next/headers";
/**
 * 1. get the body and signature from the Stripe
 * 2. set up the event
 * 3. create a switch for session.checkout.{complete || cancel || pending}
 *    - when session is completed: create new order in db from prisma and delete cart items from redis
 * 4. return the response
 *
 * @param req
 * @returns Object: Response(null, {status:200})
 */
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SECRET_WEBHOOK as string
    );
  } catch (error: unknown) {
    return new Response(`Webhooks error ${error} `, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      await prisma.order.create({
        data: {
          amount: session.amount_total as number,
          status: session.status as string,
          userId: session.metadata?.userId,
        },
      });

      await redis.del(`cart-${session.metadata?.userId}`);
      break;
    }
    default: {
      console.log("unhandled event");
    }
  }

  return new Response(null, { status: 200 });
}
