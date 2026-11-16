# The Movie Log

A personal film diary built with Astro and Tailwind. Notebook-yellow and black, with bold
Inter Tight for headings, Instrument Serif for film titles and JetBrains Mono for numbers.

- `/` shows the stats, the year strip and the 10 most recent entries.
- `/2025/`, `/2025/2/`, … list every film from a year, 50 per page (`PAGE_SIZE` in `src/utils/films.ts`).
- Entry numbers (No. 001, No. 002, …) are assigned automatically in the order you watched them.

## Adding a film

Add one Markdown file per viewing to `src/content/films/`, e.g. `2026-11-20-heat.md`:

```md
---
title: Heat
year: 1995                 # release year
director: Michael Mann
cast: [Al Pacino, Robert De Niro, Val Kilmer]
watched: 2026-11-20        # date you watched it
venue: Theater             # Theater or Home
venueDetail: 70mm          # optional: which theater, service or format
genre: [Crime, Thriller]
rating: 5                  # optional, 1–5
---
Optional notes go here.
```

Quote titles that contain a colon (`title: "Dune: Part Two"`). Notes show in a "+ Notes" toggle
on the film's row. The entries that ship with the repo are placeholders.

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start the dev server at `localhost:4321`    |
| `npm run build`   | Build the site to `./dist/`                 |
| `npm run preview` | Preview the build locally                   |
