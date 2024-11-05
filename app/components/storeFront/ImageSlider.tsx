"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImagesProps {
  images: string[];
}

export function ImageSlider({ images }: ImagesProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // go to the next image, if last then go to the first image
  function handleNext() {
    setCurrentImageIndex((prev) =>
      currentImageIndex == images.length - 1 ? 0 : currentImageIndex + 1
    );
  }

  // Select the previous image, if first then go to the last image
  function handlePrevious() {
    setCurrentImageIndex((prev) =>
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  }

  function handleSelectImage(index) {
    setCurrentImageIndex(index);
  }
  return (
    <>
      <div className="grid gap-6 md:gap-3 items-start">
        <div className="relative overflow-hidden rounded-lg ">
          <Image
            width={600}
            height={600}
            src={images[currentImageIndex]}
            alt="Product Image"
            className="object-cover object-center w-[600px] h-[600px]"
          />

          <div className="absolute inset-0 flex items-center justify-between px-4">
            <Button variant={"ghost"} onClick={handlePrevious}>
              <ChevronLeft />
            </Button>
            <Button variant={"ghost"} onClick={handleNext}>
              <ChevronRight />
            </Button>
          </div>
        </div>
        {/* Small Images */}
        <div className="grid grid-cols-6 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => handleSelectImage(index)}
              className={`relative  overflow-hidden w-full h-full object-contain  rounded-lg cursor-pointer ${
                index == currentImageIndex
                  ? "border-2 border-primary"
                  : "border border-gray-200"
              }`}
            >
              <Image
                src={image}
                alt="Product Image"
                width={100}
                height={100}
                className="object-cover w-[100px] h-[100px] rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
