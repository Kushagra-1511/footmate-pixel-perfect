# Where to place the room stories (off the homepage)

The four room stories (Penthouse Living Room, Coastal Bedroom, Boutique Hotel, Private Library) stay as illustrative "design stories", not customer reviews — so they sit best where people are imagining a product in a room.

## Ideas (pick one or combine)

1. **On each product page (recommended)** — one story per product, shown below the specs as "Imagined in a space": Comfort page gets the Penthouse, Cosy the Coastal Bedroom, Plush the hotel/penthouse, Serenity the Library. Feels natural because it shows that exact underlay in a room.
2. **A dedicated "Inspiration" page** — a calm editorial gallery of all four rooms, added to the menu and footer. Works like a lookbook, similar to Bolon's project pages.
3. **On the Why Underlay page** — the stories become "what comfort feels like" moments between the explanations.
4. **In the "Contact My Nearest Agent" / Request Samples flow** — one small story beside the form as gentle reassurance.

## Notes
- Each story keeps the small "Illustrative concept" label so nothing reads as a real review.
- The Plush story still says "Luxury Boutique Hotel" while the photo is a penthouse bedroom; I will relabel it "Dusk Penthouse Bedroom" and adjust the quote's hotel wording unless you say otherwise.
- Homepage no longer shows the section.

## Technical details
- Reuse `SpacesWeLove` data; export a `StoryCard` for single-product use on `products.$slug.tsx`, and/or a new `src/routes/inspiration.tsx` with its own head metadata, nav link in `site.ts` and sitemap entry.
