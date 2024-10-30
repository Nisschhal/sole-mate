"use client";
import { createBanner } from "@/app/actions";
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

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema } from "@/app/lib/zodSchema";
import { useState } from "react";
import Image from "next/image";
import SubmitButtons from "@/app/components/SubmitButtons";

const CreateBanner = () => {
  // Image Storage
  const [image, setImage] = useState<string | undefined>();

  const [lastResult, action] = useFormState(createBanner, undefined);

  // conform useForm
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    // Form for Product Input
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      {/* Back Button to /dashboard/products */}
      <div className="flex items-center gap-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard/banner">
            <ChevronLeft />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Banner</h1>
      </div>

      {/* Card for the Input Fields */}
      <Card className="mt-5">
        {/* Header: Product Details */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold ">Banner Details</CardTitle>
          <CardDescription>Create a new Banner</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Form Fields */}
          <div className="flex flex-col gap-6">
            {/* Input Group: Input */}
            <div className="flex flex-col gap-3">
              <Label className="text-lg">Banner Name</Label>
              <Input
                type="text"
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
                className="w-full "
                placeholder="Banner Name"
              />
              <p className="text-red-500">{fields.title.errors}</p>
            </div>

            {/* Image Upload   */}
            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={image}
                key={fields.imageString.key}
                name={fields.imageString.name}
                defaultValue={fields.imageString.initialValue as any}
              />

              {/*  Uploadthing Component */}
              {image !== undefined ? (
                <Image
                  height={200}
                  width={200}
                  src={image}
                  alt="Banner Image"
                  className="size-100 object-cover rounded-lg border"
                />
              ) : (
                <UploadDropzone
                  endpoint="bannerUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    toast.success("Image Uploaded Successfully!");
                    setImage(res[0].url);
                  }}
                  onUploadError={() => {
                    // Do something with the error.
                    toast.error("Failed to Upload Image!");
                  }}
                />
              )}
              <p className="text-red-500">{fields.imageString.errors}</p>
            </div>
          </div>
        </CardContent>
        {/* Footer for ** Submit** Button  */}
        <CardFooter>
          <SubmitButtons text="Create Banner" />
        </CardFooter>
      </Card>
    </form>
  );
};

export default CreateBanner;
