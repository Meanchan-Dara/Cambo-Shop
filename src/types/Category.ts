import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;

// If the API returns a list or a paginated response
export const CategoryListSchema = z.array(CategorySchema);
export const CategoryPageSchema = z.object({
  content: z.array(CategorySchema),
  // Add other pageable fields if needed
});

export type CategoryResponse = Category[] | { content: Category[] } | { categories: Category[] };
