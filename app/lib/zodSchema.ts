import { z } from "zod";
export const productSchema = z.object({
  name: z.string({ message: "Please enter product name!" }),
  description: z.string({ message: "Please enter description!" }),
  status: z.enum(["draft", "published", "archived"]),
  price: z.number({ message: "Enter enter price!" }).min(1),
  images: z.array(z.string()).min(1, { message: "Upload atleast 1 image!" }),
  category: z.enum(["men", "women", "kids"]),
  isFeatured: z.boolean().optional(),
});
