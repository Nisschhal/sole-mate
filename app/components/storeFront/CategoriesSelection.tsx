import Image from "next/image";
import Link from "next/link";
import all from "@/public/all.jpeg";
import men from "@/public/men.jpeg";
import women from "@/public/women.jpeg";
export function CategoriesSelection() {
  return (
    <div className="py-18 sm:py-24">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Shop by Category
        </h2>

        <Link
          href="/products/all"
          className="text-sm font-semibold text-primary hover:text-primary/80"
        >
          Browse all Products &rarr;
        </Link>
      </div>
      {/* Grid for Category Images */}
      <div className="mt-6 grid grid-col-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
        {/* Category All Item with tailwind aspect ration*/}
        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2">
          <Image
            src={all}
            alt="All Product image"
            className="object-cover object-center"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 "></div>
          <div className="p-6 flex items-end">
            <Link href={"/products/all"}>
              <h3 className="text-white font-semibold">All Products &rarr;</h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

        {/* Category Men Item with tailwind aspect ration*/}
        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={men}
            alt="Men Product image"
            className="object-cover object-bottom sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0 "></div>
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href={"/products/men"}>
              <h3 className="text-white font-semibold">Men Products &rarr;</h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

        {/* Category WOMEN   Item with tailwind aspect ration*/}
        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={women}
            alt="Women Product image"
            className="object-cover object-bottom sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0 "></div>
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href={"/products/women"}>
              <h3 className="text-white font-semibold">
                Products for Women &rarr;
              </h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
