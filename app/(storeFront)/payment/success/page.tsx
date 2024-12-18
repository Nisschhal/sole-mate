import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SucessRoute() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px] ">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="size-12 rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>

          {/* Description */}
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              Payment Successful
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Congrats to your purchase. Your payment was successful. We hope
              you enjoy your product.
            </p>

            {/* Go to homepage */}
            <Button asChild className="mt-5 w-full sm:mt-6">
              <Link href={"/"}>Go to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
