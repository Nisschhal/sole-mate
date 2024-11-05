import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface productItem {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

export function ProductCard({ item }: productItem) {
  return (
    <div className="rounded-lg ">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {item.images.map((image: string, index: number) => (
            <CarouselItem key={index}>
              <div className="relative h-[330px] ">
                <Image
                  src={image}
                  alt="Product Image"
                  fill
                  className="object-cover object-center w-full h-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
      {/* Card Body */}
      <div className="flex justify-between items-center mt-2">
        <h1 className="font-semibold text-xl">{item.name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/20 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset inset-primary/10">
          ${item.price}
        </h3>
      </div>
      {/* Car Description */}
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
        {item.description}
      </p>

      <Button asChild className="w-full mt-5">
        <Link href={`/product/${item.id}`}> Learn More!</Link>
      </Button>
    </div>
  );
}
