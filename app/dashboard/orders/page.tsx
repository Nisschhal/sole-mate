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

const Orders = () => {
  return (
    <Card>
      {/* CARD with Header and Table as Content */}

      <CardHeader className="">
        <CardTitle className="text-2xl font-bold">Orders</CardTitle>
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
              <TableRow>
                <TableCell>
                  <p className="font-medium">Rajesh Hamal</p>
                  <p className="hidden md:flex text-sm text-muted-foreground">
                    rajeshdai@gmail.com
                  </p>
                </TableCell>
                <TableCell>Sale</TableCell>
                <TableCell>Success</TableCell>
                <TableCell>2024-10-19</TableCell>
                <TableCell className="text-right font-semibold">
                  $199.00
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default Orders;
