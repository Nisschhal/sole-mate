"use client";
import { createProduct } from "@/app/actions";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchema";
import { useState } from "react";
import Image from "next/image";
import SubmitButtons from "@/app/components/SubmitButtons";

const CreateProduct = () => {
  // Image Storage
  const [images, setImages] = useState<string[]>([]);

  const [lastResult, action] = useFormState(createProduct, undefined);

  // conform useForm
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  // Function to handle image delete
  function handleImageDelete(index: number) {
    setImages(images.filter((_, i) => i !== index));
  }

  return (
    // Form for Product Input
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      {/* Back Button to /dashboard/products */}
      <div className="flex items-center gap-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Product</h1>
      </div>

      {/* Card for the Input Fields */}
      <Card className="mt-5">
        {/* Header: Product Details */}
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
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
                className="w-full "
                placeholder="Product Name"
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>
            {/* Input Group: TextArea */}
            <div className="flex flex-col gap-3">
              <Label className="text-lg">Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={fields.description.initialValue}
                className="w-full "
                placeholder="Enter Product Description right here..."
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>
            {/* Input Group: Number */}
            <div className="flex flex-col gap-3">
              <Label className="text-lg">Enter Price</Label>
              <Input
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={fields.price.initialValue}
                type="number"
                className="w-full "
                placeholder="$55"
              />
              <p className="text-red-500">{fields.price.errors}</p>
            </div>

            {/* Input Group: Switch */}
            <div className="flex flex-col gap-3">
              <Label className="text-lg">Featured Product</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultValue={fields.isFeatured.initialValue}
              />
              <p className="text-red-500">{fields.isFeatured.errors}</p>
            </div>
            {/* Input Group: Select(dropdown) */}
            <div className="flex flex-col gap-3">
              <Label className="text-lg">Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={fields.status.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Publish</SelectItem>
                  <SelectItem value="archived">Archive</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.status.errors}</p>
            </div>
            {/* Category  */}
            <div className="flex flex-col gap-3">
              <Label className="text-lg">Category</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={fields.category.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kids">Kids</SelectItem>
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.category.errors}</p>
            </div>

            {/* Image Upload   */}
            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as any}
              />

              {/*  Uploadthing Component */}
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative size-[100px]">
                      <Image
                        height={100}
                        width={100}
                        src={image}
                        alt="Product Image"
                        className="size-full object-cover rounded-lg border"
                      />
                      <button
                        className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg"
                        onClick={() => handleImageDelete(index)}
                      >
                        <XIcon className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    toast.success("Image Uploaded Successfully!");
                    setImages(res.map((r) => r.url));
                  }}
                  onUploadError={() => {
                    // Do something with the error.
                    toast.error(
                      "Failed to Upload Image! /n Due to Server Hibernation, please try 4-5 times to awake :)"
                    );
                  }}
                />
              )}
              <p className="text-red-500">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        {/* Footer for ** Submit** Button  */}
        <CardFooter>
          <SubmitButtons text="Create Product" />
        </CardFooter>
      </Card>
    </form>
  );
};

export default CreateProduct;
