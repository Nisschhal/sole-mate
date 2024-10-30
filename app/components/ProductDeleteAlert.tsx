import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import React from "react";
import { deleteProduct, deleteBanner } from "../actions";

const ProductDeleteAlert = ({
  id,
  deleteType,
}: {
  id: string;
  deleteType: string;
}) => {
  let action = deleteProduct;
  if (deleteType == "banner") {
    action = deleteBanner;
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="text-sm pl-2 py-2 rounded-sm hover:bg-slate-100 w-full transition duration-200 text-left">
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              product and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action={action}>
              <input type="hidden" name="id" value={id} />
              <Button type="submit" variant={"destructive"} asChild>
                <AlertDialogAction>Continue</AlertDialogAction>
              </Button>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductDeleteAlert;
