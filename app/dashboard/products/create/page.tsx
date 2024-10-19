import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";

const CreateProduct = () => {
  return (
    <form>
      <div className="flex items-center gap-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Product</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle className="text-2xl font-bold ">Product Details</CardTitle>
          <CardDescription>Create a new Product</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Form Fields */}
          <div className="flex flex-col gap-6">
            {/* Input Group: Input */}
            <div className="flex flex-col gap-3">
              <Label className="text-lg">Name</Label>
              <Input
                type="text"
                className="w-full "
                placeholder="Product Name"
              />
            </div>
            {/* Input Group: TextArea */}
            <div className="flex flex-col gap-3">
              <Label className="text-lg">Description</Label>
              <Textarea
                className="w-full "
                placeholder="Enter Product Description right here..."
              />
            </div>
            {/* Input Group: Number */}
            <div className="flex flex-col gap-3">
              <Label className="text-lg">Enter Price</Label>
              <Input type="number" className="w-full " placeholder="$55" />
            </div>

            {/* Input Group: Switch */}
            <div className="flex flex-col gap-3">
              <Label className="text-lg">Featured Product</Label>
              <Switch />
            </div>
            {/* Input Group: Select */}
            <div className="flex flex-col gap-3">
              <Label className="text-lg">Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="publish">Publish</SelectItem>
                  <SelectItem value="archive">Archive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default CreateProduct;
