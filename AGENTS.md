<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Product facts live only in `src/data/products.ts`; company, nav and resources in `src/data/site.ts` — keeps every page consistent.
- Unverified specs/ratings/documents stay `null` and render "Available on request" — the brief forbids invented data.
- Form submissions go through the `submitEnquiry` server function into the `enquiries` table (RLS on, no client policies) — leads are never publicly readable.
- Finder recommendation rules live in `src/lib/recommend.ts` and are covered by `src/test/recommend.test.ts`.
- Keep existing product slugs and accent-token keys stable when display names change — preserves saved comparisons, enquiry identifiers and existing product/sample links.
- The rating scale is defined with product data and shared by product displays and comparisons — prevents different pages from presenting inconsistent booklet scores.
