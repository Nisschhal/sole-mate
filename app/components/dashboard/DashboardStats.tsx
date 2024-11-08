import prisma from "@/app/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, User } from "lucide-react";

const getData = async () => {
  const [users, products, orders] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),

    prisma.product.findMany({
      select: { id: true },
    }),

    prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ]);

  return { users, products, orders };
};

export async function DashboardStats() {
  const { users, products, orders } = await getData();
  // total Revenue
  const totalAmount = orders.reduce((acc, item) => acc + item.amount, 0);

  return (
    /* UPPER GRID FOR 4 CARD: Revenus || Sales || Products || Users */
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {/* REVENUE CARD   */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle className="text-2xl font-bold">Total Revenue</CardTitle>
          <DollarSign className="size-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            $ {new Intl.NumberFormat("en-US").format(totalAmount / 100)}
          </p>
          <p className="text-xm text-muted-foreground">Based on 100 charges</p>
        </CardContent>
      </Card>
      {/* SALES CARD   */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle className="text-2xl font-bold">Total Sales</CardTitle>
          <ShoppingBag className="size-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">+{orders.length}</p>
          <p className="text-xm text-muted-foreground">
            Total sales on SoleMate
          </p>
        </CardContent>
      </Card>
      {/* PRODUCTS  CARD   */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle className="text-2xl font-bold">Total Products</CardTitle>
          <PartyPopper className="size-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{products.length}</p>
          <p className="text-xm text-muted-foreground">Total Product Created</p>
        </CardContent>
      </Card>
      {/* USERS CARD   */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle className="text-2xl font-bold">Total Users</CardTitle>
          <User className="size-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{users.length}</p>
          <p className="text-xm text-muted-foreground">Total Users Signed Up</p>
        </CardContent>
      </Card>
    </div>
  );
}
