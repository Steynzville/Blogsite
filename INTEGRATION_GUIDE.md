# Veluce integrations

Read `VELUCE_OPERATING_SYSTEM.md` and `ops/state.json` first. This guide covers the site's current contact and newsletter connections. The two forms have different purposes and must remain separate.

## Contact form: Formspree

`src/pages/Contact.tsx` uses Formspree's React integration (`xvznkjdl`). It sends contact messages through the existing configured form and shows success or error feedback. PR #1 does not replace that integration. Steyn's June welcome-email example came from the existing Formspree new-user signup, not MailerLite. Keep that welcome flow and Formspree submissions separate from the new newsletter group; do not infer newsletter consent from them.

To check the contact page, submit a clearly marked test message through `/contact/`, confirm the on-page result and verify it appears in the existing Formspree contact form. Keep test messages out of business lead counts. Do not post private submissions or account exports to this public repository.

## Newsletter: MailerLite

The homepage newsletter is separate. Its former source called MailerLite's private subscriber API from browser JavaScript. That path was removed because a `VITE_*` build variable is included in the public site bundle even if GitHub supplied it from a secret. The old code does not establish the source of Steyn's historical welcome email; he identified Formspree as its source.

The newly created MailerLite account uses the **VELUCE Newsletter** group and **VELUCE Journal Newsletter** embedded form. The public embed configuration is in `index.html` and `Home.tsx`; the latter provides the form's public share URL as a fallback. These are public form values, never a private API token. The form's double opt-in switch is on. The new welcome automation is separate from the historical Formspree message.

The account owner activated the welcome workflow, which triggers when a confirmed subscriber joins **VELUCE Newsletter**. Two September 28 tests through the public form share URL reached the confirmation screen: one used the business-domain forwarder and one used its destination mailbox directly. The owner clicked the confirmation link for the direct mailbox; MailerLite records it as **Active** with an opt-in date in the correct group. The automation shows one completed run, one delivery, and zero bounces, and the owner received the welcome message in Gmail. Its footer and Gmail interface show unsubscribe, though the unsubscribe action was not exercised. The forwarder record remains **Unconfirmed** despite tracked confirmation-email opens and clicks. The form's subscriber count includes unconfirmed records; it is not an active-list count. A separate welcome-email preview to the forwarder showed **Sent**, without recipient inbox verification.

Before merging, review the PR and successful CI. Test the actual site embed after deployment, and exercise unsubscribe with a separate disposable test subscriber if practical. The confirmed direct-mailbox test proves the hosted MailerLite form's signup-to-welcome path, while the site embed itself remains untested on production. The existing Formspree email is evidence only for its own earlier flow.

No Formspree submission is copied into MailerLite. Do not enable a paid Formspree integration or upgrade either service without approval. MailerLite's free tier has subscriber and monthly-email limits; the current 14-day trial does not authorize a paid plan. The owner chose the account Gmail as sender for both confirmation and welcome mail; MailerLite rewrites its technical From address onto its sending domain and retains the Gmail Reply-to. Namecheap's business-domain forwarding address receives at a Gmail mailbox and is not a custom sending service. MailerLite's current plan disables editing the generic double opt-in email design; its social icons did not render in the owner's Gmail screenshot. Do not invent domain authentication records or claim delivery through the forwarder without a recipient check.

If the former MailerLite private key was configured in GitHub or deployed in a public JavaScript bundle, the account owner must revoke or rotate it and remove the obsolete GitHub secret. Do not retrieve, print, test or place the old key in a browser variable. The old public universal-script account ID was replaced with the new account ID.

## Other integrations and checks

- Google Analytics is present in `index.html`. `ops/MEASUREMENT.md` defines the commercial-click event and the account-level checks needed before using it to make profit decisions.
- Affiliate links must come from an approved programme and exact eligible product. `pnpm ops:audit` catches direct Amazon exits and obvious source errors; it cannot verify Short.io destinations or commissions.
- Pinterest URLs with UTM parameters must land on their intended article. Test one real campaign-shaped URL after deployment.
- Keep credentials and private customer data out of this public repository. Only public configuration belongs in `VITE_*` variables.

## Validation and release

Run `pnpm check`, `pnpm test`, `pnpm ops:audit`, `pnpm build`, and `pnpm ops:validate`. Inspect desktop and mobile navigation, article disclosure, outbound links, embedded newsletter form and fallback URL, theme, contact form and a UTM landing page. Review the PR and successful CI before merging; verify GitHub Pages and a fresh subscription after deployment. Keep the current production site live until these gates pass.
