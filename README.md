# Tech4PM.com

Website for Tech4PM: technical and AI training for product and project managers, including the flagship **AI for Project Managers** program in Armenian (`/program/`) and English (`/en/program/`).

## How the site is built

- `src/index.html` is the whole site as one file. Edit content and design here.
- `scripts/build.py` opens that file in a headless browser, renders every page and saves it as its own static page, for example `/courses/sql-analytics/index.html`. Each page gets:
  - a unique title and meta description
  - a canonical URL, plus Open Graph and Twitter tags (share image: `og-image.png`)
  - `hreflang` links between the Armenian and English program pages
  - schema.org data: `Organization` and `WebSite` on the home page, `Course` on course and program pages, `Article` on docs, `FAQPage` on About, and `BreadcrumbList` on inner pages
- The build also writes `sitemap.xml`, `robots.txt`, `404.html` and `favicon.svg`.
- Shared styles and scripts go to `assets/site.css` and `assets/app.js`, so browsers download them once.
- `assets/nav.js` turns the source's `#route` links into real paths and redirects old `/#route` links to the new addresses.

Everything at the repository root except `src/`, `scripts/`, `assets/nav.js`, `README.md`, `CNAME` and `.nojekyll` is generated, so don't edit it by hand.

### Rebuild after a change

```bash
pip install playwright
playwright install chromium
python scripts/build.py
```

Commit the regenerated files together with your change to `src/index.html`.

## Host it on GitHub Pages

1. In this repository, open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
3. The `CNAME` file sets the custom domain to `tech4pm.com`. Confirm it in **Settings → Pages** and tick **Enforce HTTPS** once it is available.

## Point the domain at GitHub Pages

At your domain registrar, set these DNS records for `tech4pm.com`:

| Type  | Name | Value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | alberthovhannisyan.github.io |

Check the current values in GitHub's documentation, "Managing a custom domain for your GitHub Pages site", before you change them. DNS changes can take up to 24 hours.

## After launch: search setup

1. Add the site to **Google Search Console** (verify with a DNS TXT record), then submit `https://tech4pm.com/sitemap.xml`.
2. Do the same in **Bing Webmaster Tools**. It can import from Search Console.
3. Check pages with Google's **Rich Results Test** and fix anything it reports.
4. Replace `og-image.png` with your own branded image (1200×630) if you have one, then rebuild.

## Connect the forms to Google Forms

The waitlist, contact, team and newsletter forms are ready to send to a Google Form, so submissions land in a Google Sheet.

1. Create a Google Form with these short-answer questions: kind, course, start, name, email, roleType, jobTitle, experience, goal, message, company, teamSize.
2. In `src/index.html`, find `var GOOGLE_FORM={action:'',fields:{}};`.
3. Set `action` to the form's `formResponse` URL and map each field name to the form's `entry.<number>` id, for example:

```js
var GOOGLE_FORM={action:'https://docs.google.com/forms/d/e/<FORM_ID>/formResponse',fields:{kind:'entry.111',email:'entry.222',name:'entry.333'}};
```

4. Rebuild.

Until this is set, the forms tell visitors that online sign-up is not open yet.

## Before launch

- Fill in the highlighted placeholders on the Privacy, Terms, Cookie and Refund pages (company name, address, contact email, payment provider, refund rules), have them reviewed by a lawyer, and remove the "Draft for review" notice.
- Add real cohort dates, prices and instructor details when they are confirmed.

## History

The previous Next.js version of the site was uploaded as raw `.git` data. Its source files are kept on the `archive-nextjs` branch.
