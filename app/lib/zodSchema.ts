import { z } from "zod";
export const productSchema = z.object({
  name: z.string({ message: "Please enter product name!" }),
  description: z.string({ message: "Please enter description!" }),
  status: z.enum(["draft", "published", "archived"], {
    message: "Select a status!",
  }),
  price: z.number({ message: "Enter enter price!" }).min(1),
  images: z.array(z.string().min(1), { message: "Upload atlease 1 image!" }),
  category: z.enum(["men", "women", "kids"], { message: "Select a category!" }),
  isFeatured: z.boolean().optional(),
});
