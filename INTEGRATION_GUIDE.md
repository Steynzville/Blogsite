# Veluce integrations

Read `VELUCE_OPERATING_SYSTEM.md` and `ops/state.json` first. This guide covers the site's current contact and newsletter connections. The two forms have different purposes and must remain separate.

## Contact form: Formspree

`src/pages/Contact.tsx` uses Formspree's React integration. It sends contact messages through the existing configured form and shows success or error feedback. PR #1 does not replace that integration. Check the Formspree dashboard to verify messages; do not treat contact submissions as newsletter consent or add those addresses to a mailing list.

To check the contact page, submit a clearly marked test message through `/contact/`, confirm the on-page result and verify it appears in the existing Formspree contact form. Keep test messages out of business lead counts. Do not post private submissions or account exports to this public repository.

## Newsletter: public provider signup form

The homepage newsletter is separate. Its former implementation called MailerLite's private subscriber API from browser JavaScript. That path was removed because a `VITE_*` build variable is included in the public site bundle even if GitHub supplied it from a secret. The existing provider account and welcome-email workflow need account-level verification before publication.

Use a verified HTTPS hosted signup form from the actual newsletter provider. Configure its public URL as the GitHub repository **variable** `VITE_NEWSLETTER_FORM_URL`. The homepage then links to that real signup form. This is a public link, never an API token. The production deployment intentionally fails when this variable is missing or not HTTPS, so the PR cannot silently replace a working signup with a dead end.

Before merging, verify the destination belongs to the intended Veluce account, the correct subscriber group receives signups, the consent and privacy language is accurate, and unsubscribe works. Submit one clearly marked test subscription, confirm receipt and any confirmation or welcome message, then remove that test subscriber if appropriate. Do not claim a newsletter signup is working based only on a successful build or a historical email.

Formspree's existing contact form is not a newsletter list. Its newsletter-provider plugin is a paid feature on current plans, so do not enable it or upgrade without the owner's approval. A provider-native public form is the zero-spend path if the existing provider account supports it.

If the former MailerLite private key was configured in GitHub or deployed in a public JavaScript bundle, the account owner must revoke or rotate it and remove the obsolete GitHub secret. Do not retrieve, print, test or place the old key in a browser variable. The public universal-script account ID in `index.html` is distinct from a private API token; review whether that script is needed after the newsletter form is chosen.

## Other integrations and checks

- Google Analytics is present in `index.html`. `ops/MEASUREMENT.md` defines the commercial-click event and the account-level checks needed before using it to make profit decisions.
- Affiliate links must come from an approved programme and exact eligible product. `pnpm ops:audit` catches direct Amazon exits and obvious source errors; it cannot verify Short.io destinations or commissions.
- Pinterest URLs with UTM parameters must land on their intended article. Test one real campaign-shaped URL after deployment.
- Keep credentials and private customer data out of this public repository. Only public configuration belongs in `VITE_*` variables.

## Validation and release

Run `pnpm check`, `pnpm test`, `pnpm ops:audit`, `pnpm build`, and `pnpm ops:validate`. Inspect desktop and mobile navigation, article disclosure, outbound links, newsletter destination, theme, contact form and a UTM landing page. Review the PR and successful CI before merging; verify GitHub Pages and a fresh subscription after deployment. Keep the current production site live until these gates pass.
