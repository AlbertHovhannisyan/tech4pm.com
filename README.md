# Tech4PM.com

Website for Tech4PM: technical and AI training for product and project managers, including the flagship **AI for Project Managers** program (Armenian and English).

The whole site is one static file, `index.html`. Pages are switched with links such as `#program`, `#courses` and `#privacy`, so no build step or server is needed.

## Host it on GitHub Pages

1. In this repository, open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
3. The `CNAME` file already sets the custom domain to `tech4pm.com`. In **Settings → Pages**, confirm the domain and tick **Enforce HTTPS** once it is available.

## Point the domain at GitHub Pages

At your domain registrar, set these DNS records for `tech4pm.com`:

| Type  | Name | Value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | alberthovhannisyan.github.io |

DNS changes can take up to 24 hours to apply. Check the current values in GitHub's documentation, "Managing a custom domain for your GitHub Pages site", before you change them.

## Connect the forms to Google Forms

The waitlist, contact, team and newsletter forms are ready to send to a Google Form, so submissions land in a Google Sheet.

1. Create a Google Form with these questions (short answer): kind, course, start, name, email, roleType, jobTitle, experience, goal, message, company, teamSize.
2. In `index.html`, find `var GOOGLE_FORM={action:'',fields:{}};`.
3. Set `action` to the form's `formResponse` URL and map each field name to the form's `entry.<number>` id, for example:

```js
var GOOGLE_FORM={action:'https://docs.google.com/forms/d/e/<FORM_ID>/formResponse',fields:{kind:'entry.111',email:'entry.222',name:'entry.333'}};
```

Until this is set, the forms tell visitors that online sign-up is not open yet.

## Before launch

- Fill in the highlighted placeholders on the Privacy, Terms, Cookie and Refund pages (company name, address, contact email, payment provider, refund rules), have them reviewed by a lawyer, and remove the "Draft for review" notice.
- Add real cohort dates, prices and instructor details when they are confirmed.

## History

The previous Next.js version of the site was uploaded as raw `.git` data. Its source files are kept on the `archive-nextjs` branch.
