import prisma from "@/app/lib/db";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarImage } from "@radix-ui/react-avatar";

const getData = async () => {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      id: true,
      User: {
        select: {
          email: true,
          firstName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
  return data;
};
export async function RecentSales() {
  const orders = await getData();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {orders.map((item) => (
          <div className="flex items-center gap-4" key={item.id}>
            {/* USER Avatar */}
            <Avatar className="hidden sm:flex size-9">
              <AvatarImage src={item.User?.profileImage} alt="Avatar Image" />
              <AvatarFallback>
                {item.User?.firstName.split("").slice(0, 3)}
              </AvatarFallback>
            </Avatar>
            {/* Name && Email  */}
            <div className="grid ">
              <p className="text-sm">{item.User?.firstName}</p>
              <p className="text-sm text-muted-foreground">
                {item.User?.email}
              </p>
            </div>
            {/* price */}
            <p className="ml-auto font-medium">
              +${new Intl.NumberFormat("en-US").format(item.amount / 100)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
