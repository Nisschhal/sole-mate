import ProductDeleteAlert from "@/app/components/ProductDeleteAlert";
import prisma from "@/app/lib/db";
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
import Image from "next/image";
import Link from "next/link";
// get the product data
const getProductData = async () => {
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};

const Products = async () => {
  const products = await getProductData();

  // delete the product

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
          {products.length > 0 ? (
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
                {/* List of all the products */}
                {products.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.images.length > 0 ? (
                        <Image
                          alt="Product Image"
                          src={product.images[0]}
                          height={64}
                          width={64}
                          className="rounded-md object-cover size-16"
                        />
                      ) : (
                        <UserIcon className="size-16" />
                      )}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.status}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat("en-US").format(
                        product.createdAt
                      )}
                    </TableCell>
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
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/products/${product.id}`}>
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <ProductDeleteAlert productId={product.id} />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            [1, 2, 3, 4, 5].map((_, index) => (
              <div
                key={index}
                className="h-20 w-full mb-4 bg-gray-200 rounded-md animate-pulse"
              ></div>
            ))
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Products;
