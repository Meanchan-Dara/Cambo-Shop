import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string().nullable().optional(),
  price: z.number(),
  description: z.string().nullable().optional(),
  categoryId: z.number().nullable().optional(),
  categoryName: z.string().nullable().optional(),
  rating: z.number().optional(),
  reviewsCount: z.number().optional(),
  isNew: z.boolean().optional(),
  discount: z.number().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
