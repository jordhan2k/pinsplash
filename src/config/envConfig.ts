import { z } from "zod";

const configSchema = z.object({
  API_ENDPOINT: z.string(),
  PUBLIC_URL: z.string(),
  UNSPLASH_ACCESS_TOKEN: z.string(),
});

const configProject = configSchema.safeParse({
  API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  UNSPLASH_ACCESS_TOKEN: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_TOKEN,
});

if (!configProject.success) {
  throw new Error("Invalid environment!");
}

export const envConfig = configProject.data;
