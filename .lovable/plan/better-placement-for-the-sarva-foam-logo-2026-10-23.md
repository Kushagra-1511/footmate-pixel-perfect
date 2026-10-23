# Better placement for the Sarva Foam logo

Right now the small Sarva Foam badge sits on its own under the footer's intro text. It floats with nothing around it, so it looks out of place.

## Change
- Take the badge out of the footer intro column.
- Put it in a new "parent brand" line just above the copyright bar. Small caps "A BRAND OF" sit on the left with the Sarva Foam logo on a light panel next to them. "Sarva Foam Industries" and "Commitment through quality" go to the right as quiet text. A thin divider runs above and below it, so it reads as a deliberate sign-off and not a stray image.
- The panel is a little bigger and has more space around it, so the red mark is easy to read.
- On phones it stacks: label first, then the logo.
- Nothing else changes. The FOOTMATE logo, headline, motto and link columns all stay as they are.

## Technical
- Edit `src/components/site/SiteFooter.tsx` only: delete the badge div in the col-span-5 block. Add a `border-t border-ink-foreground/10` row with `container-site flex items-center gap-6 py-8` holding an eyebrow label, the logo on `bg-ink-foreground px-4 py-3` (h-12), and the descriptor text.
- Check at 927px and 390px with one screenshot each.
