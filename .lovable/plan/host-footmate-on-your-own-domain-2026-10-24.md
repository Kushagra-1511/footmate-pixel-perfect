# Host FOOTMATE on your own domain

## What already works
The site's database (where enquiries are saved) already runs on Lovable Cloud, which is built on Supabase. You don't need a separate Supabase account or any connection step. The same database serves the preview and the published site, so enquiries keep arriving after you go live.

## Steps
1. **Publish the site.** It isn't published yet. Publishing puts it on a lovable.app web address.
2. **Connect your domain.** I open the domain connection card. You enter your domain (for example footmate.com.au) and add the DNS records it shows at your domain provider, such as GoDaddy or Crazy Domains.
3. **Check it.** Once the domain is active, I confirm that the site loads on your domain and that an enquiry is saved.

## What stays the same
- No changes to the design, wording or code.
- No changes to the database. Enquiries stay private.

## Technical details
- Backend: Lovable Cloud (managed Supabase). No migration and no new keys.
- Domain: connect it through domain_connect, then check it with domain_status after the DNS records update.
