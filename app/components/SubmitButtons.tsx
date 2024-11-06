"use client";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { useFormStatus } from "react-dom";

const SubmitButtons = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Please Wait...
        </Button>
      ) : (
        <Button type="submit">{text}</Button>
      )}
    </>
  );
};

export default SubmitButtons;

export function ShoppingBagButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button size={"lg"} disabled className="w-full mt-5">
          <Loader2 className="mr-4 size-5 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button size={"lg"} className="w-full mt-5" type="submit">
          <ShoppingBag className="mr-4 size-5" />
          Add to Cart
        </Button>
      )}
    </>
  );
}
