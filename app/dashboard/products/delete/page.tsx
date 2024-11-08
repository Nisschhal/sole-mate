import { Button } from "@/components/ui/button";

import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteProduct } from "@/app/actions";

const ProductDeleteAlert = ({ productId }: { productId: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Are you absolutely sure?</CardTitle>
        <CardDescription>
          This action cannot be undone. This will permanently delete your
          product and remove your data from our servers.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Cancel</Button>
        <form action={deleteProduct}>
          <input type="hidden" name="productId" value={productId} />
          <Button>Continue</Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ProductDeleteAlert;
