import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontalIcon, PlusCircle, UserIcon } from "lucide-react";
import Link from "next/link";

const Products = () => {
  return (
    <>
      <div className="flex items-center justify-end">
        <Button asChild>
          <Link href={"/dashboard/products/create"}>
            <PlusCircle className="size-3.5" />
            <span>Add Product</span>
          </Link>
        </Button>
      </div>

      {/* CARD Product Detail */}
      <Card className="mt-5">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Products</CardTitle>
          <CardDescription>
            Manage your product and view their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* TABLE Product Item */}
          <Table>
            {/* Header */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {/* Body */}
            <TableBody>
              <TableRow>
                <TableCell>
                  <UserIcon className="size-16" />
                </TableCell>
                <TableCell>Nike Air</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>$199.99</TableCell>
                <TableCell>2024-10-15</TableCell>
                <TableCell className="text-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button size="icon" variant="ghost" asChild>
                        <MoreHorizontalIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default Products;
