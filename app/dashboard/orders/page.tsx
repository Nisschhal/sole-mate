import prisma from "@/app/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// get the orders from the db
async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      status: true,
      id: true,
      User: {
        select: {
          firstName: true,
          email: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

const Orders = async () => {
  const orders = await getData();
  return (
    <Card>
      {/* CARD with Header and Table as Content */}

      <CardHeader className="">
        <CardTitle className="text-2xl font-bold ">Orders</CardTitle>
        <CardDescription className="text-base ">
          Recent orders from your store!
        </CardDescription>
        <CardContent>
          {/* TABLE */}
          <Table
            className="my-2
          "
          >
            {/* Header */}
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            {/* Body */}
            <TableBody>
              {orders.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <p className="font-medium">{item.User?.firstName}</p>
                    <p className="hidden md:flex text-sm text-muted-foreground">
                      {item.User?.email}
                    </p>
                  </TableCell>
                  <TableCell>Order</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("en-US").format(item.createdAt)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    $ {new Intl.NumberFormat("en-US").format(item.amount / 100)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default Orders;
