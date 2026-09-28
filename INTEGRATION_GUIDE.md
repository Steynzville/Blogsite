# Veluce integrations

Read `VELUCE_OPERATING_SYSTEM.md` and `ops/state.json` first. This guide covers the site's current contact and newsletter connections. The two forms have different purposes and must remain separate.

## Contact form: Formspree

`src/pages/Contact.tsx` uses Formspree's React integration (`xvznkjdl`). It sends contact messages through the existing configured form and shows success or error feedback. PR #1 does not replace that integration. Steyn's June welcome-email example came from the existing Formspree new-user signup, not MailerLite. Keep that welcome flow and Formspree submissions separate from the new newsletter group; do not infer newsletter consent from them.

To check the contact page, submit a clearly marked test message through `/contact/`, confirm the on-page result and verify it appears in the existing Formspree contact form. Keep test messages out of business lead counts. Do not post private submissions or account exports to this public repository.

## Newsletter: MailerLite

The homepage newsletter is separate. Its former source called MailerLite's private subscriber API from browser JavaScript. That path was removed because a `VITE_*` build variable is included in the public site bundle even if GitHub supplied it from a secret. The old code does not establish the source of Steyn's historical welcome email; he identified Formspree as its source.

The newly created MailerLite account uses the **VELUCE Newsletter** group and **VELUCE Journal Newsletter** embedded form. The public embed configuration is in `index.html` and `Home.tsx`; the latter provides the form's public share URL as a fallback. These are public form values, never a private API token. The form's double opt-in switch is on. The new welcome automation is separate from the historical Formspree message.

The account owner activated the welcome workflow, which triggers when a confirmed subscriber joins **VELUCE Newsletter**. Two September 28 tests through the public form share URL reached the confirmation screen: one used the business-domain forwarder and one used its destination mailbox directly. MailerLite's confirmation-email report shows a send to each address, but both subscriber records remained **Unconfirmed** with no opt-in date. The forwarder showed tracked opens and clicks, which did not complete opt-in. Neither test has triggered the welcome automation. The form's subscriber count includes these unconfirmed records; it is not an active-list count. After the owner verified the test recipient, MailerLite accepted a separate welcome-email preview to the forwarder and showed **Sent**; this preview does not confirm a newsletter opt-in or prove inbox delivery.

Before merging, confirm a test email from the recipient mailbox, verify the subscriber becomes Active, then check the welcome email and unsubscribe. Test the actual site embed after deployment as well. The existing Formspree email is evidence only for its own earlier flow. Do not claim end-to-end delivery from a public form preview, a successful build, or MailerLite's sent metric alone.

No Formspree submission is copied into MailerLite. Do not enable a paid Formspree integration or upgrade either service without approval. MailerLite's free tier has subscriber and monthly-email limits; the current 14-day trial does not authorize a paid plan. The owner chose the account Gmail as sender for both confirmation and welcome mail; MailerLite warns that free-domain sending may affect delivery. Namecheap's business-domain forwarding address receives at a Gmail mailbox and is not a custom sending service. Do not invent domain authentication records or claim inbox delivery without a recipient check.

If the former MailerLite private key was configured in GitHub or deployed in a public JavaScript bundle, the account owner must revoke or rotate it and remove the obsolete GitHub secret. Do not retrieve, print, test or place the old key in a browser variable. The old public universal-script account ID was replaced with the new account ID.

## Other integrations and checks

- Google Analytics is present in `index.html`. `ops/MEASUREMENT.md` defines the commercial-click event and the account-level checks needed before using it to make profit decisions.
- Affiliate links must come from an approved programme and exact eligible product. `pnpm ops:audit` catches direct Amazon exits and obvious source errors; it cannot verify Short.io destinations or commissions.
- Pinterest URLs with UTM parameters must land on their intended article. Test one real campaign-shaped URL after deployment.
- Keep credentials and private customer data out of this public repository. Only public configuration belongs in `VITE_*` variables.

## Validation and release

Run `pnpm check`, `pnpm test`, `pnpm ops:audit`, `pnpm build`, and `pnpm ops:validate`. Inspect desktop and mobile navigation, article disclosure, outbound links, embedded newsletter form and fallback URL, theme, contact form and a UTM landing page. Review the PR and successful CI before merging; verify GitHub Pages and a fresh subscription after deployment. Keep the current production site live until these gates pass.
