import { Button } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, PlusCircle, User2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import ProductDeleteAlert from "@/app/components/ProductDeleteAlert";
import prisma from "@/app/lib/db";
import Image from "next/image";

const getBanner = async () => {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};

const BannerRoute = async () => {
  const banners = await getBanner();

  return (
    <>
      {/* Banner Creation Icon */}
      <div className="flex items-center justify-end ">
        <Button asChild className="flex gap-x-2">
          <Link href={"/dashboard/banner/create"}>
            <PlusCircle className="size-3.5" />
            <span>Add Banner</span>
          </Link>
        </Button>
      </div>

      {/* Banner List */}
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Banner</CardTitle>
          <CardDescription>Manage your banners</CardDescription>
        </CardHeader>
        <CardContent>
          {banners.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banners.map((banner, index) => (
                  <>
                    <TableRow key={index}>
                      <TableCell>
                        {(banner.imageString && (
                          <Image
                            src={banner.imageString}
                            alt="Banner Image"
                            width={64}
                            height={64}
                            className="rounded-md object-cover size-16"
                          />
                        )) || <User2 />}
                      </TableCell>
                      <TableCell className="font-medium">
                        {banner.title}
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
                              <Link href={`/dashboard/banner/${123}`}>
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <ProductDeleteAlert
                                id={banner.id}
                                deleteType="banner"
                              />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </>
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

export default BannerRoute;
