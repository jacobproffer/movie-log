import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * One Markdown file per viewing in src/content/films/.
 * The file body is optional and holds any notes about the watch.
 */
const films = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/films" }),
  schema: z.object({
    title: z.string(),
    /** Release year of the film. */
    year: z.number().int(),
    director: z.string(),
    /** Main cast only, top-billed first. */
    cast: z.array(z.string()).default([]),
    /** The date you watched it. */
    watched: z.coerce.date(),
    /** Where you watched it. */
    venue: z.enum(["Theater", "Home"]),
    /** Optional: which theater, or which service/format at home. */
    venueDetail: z.string().optional(),
    genre: z.array(z.string()).min(1),
    /** Your rating, 1 to 5. Leave it out if you haven't rated it. */
    rating: z.number().int().min(1).max(5).optional(),
  }),
});

export const collections = { films };
