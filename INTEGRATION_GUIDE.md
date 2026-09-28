> Current operations: read [VELUCE_OPERATING_SYSTEM.md](VELUCE_OPERATING_SYSTEM.md). Do not follow legacy Amazon membership or client-side API-key guidance below.

# VELUCE Blog - Serverless Integration Guide

This guide provides step-by-step instructions for configuring Formspree and MailerLite with your VELUCE blog. The blog is now fully static with no database dependencies.

## Table of Contents

1. [Formspree Setup (Contact Form)](#formspree-setup)
2. [MailerLite Setup (Newsletter)](#mailerlite-setup)
3. [Affiliate Components](#affiliate-components)
4. [Deployment to GitHub Pages](#deployment-to-github-pages)
5. [Testing](#testing)

---

## Formspree Setup

Formspree handles all contact form submissions and sends them directly to your email.

### Step 1: Create a Formspree Account

1. Go to [formspree.io](https://formspree.io)
2. Sign up with your email address
3. Verify your email

### Step 2: Create a New Form

1. In the Formspree dashboard, click **"New Form"**
2. Name it `VELUCE Contact Form`
3. Set the email address to: `steyn.enslin@heatrecovery.co.za`
4. Click **Create**

### Step 3: Get Your Form ID

1. After creating the form, you'll see a form ID (e.g., `f/xyzqwert`)
2. Copy this ID

### Step 4: Update Contact.tsx

In `/client/src/pages/Contact.tsx`, replace the Formspree endpoint:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
  }),
});
```

Replace `YOUR_FORM_ID` with your actual Formspree form ID.

### Step 5: Configure Formspree Settings (Optional)

In the Formspree dashboard:
- Enable **CAPTCHA** for spam protection
- Set up **email notifications** for new submissions
- Configure **auto-reply** emails to users

---

## MailerLite Setup

Use the existing account's verified **public hosted subscription form**, configured as the GitHub repository variable `VITE_NEWSLETTER_FORM_URL`. Never put a private MailerLite API token in static browser code or any `VITE_*` value. With no public form configured, the site offers a journal link and collects no email addresses.

Before enabling the public form, verify its identity, consent wording, privacy link, unsubscribe mechanism and successful real subscription through the provider. Do not create a paid plan, send a campaign or enrol a person without authorisation. If the old private token was configured/deployed, revoke or rotate it through the account and remove the obsolete GitHub secret. The public account identifier used by the universal embed is not a private API token.

## Affiliate Components

Two reusable components are available for product recommendations:

### AffiliateBlock (Single Product)

Use for featuring a single product prominently:

```tsx
import AffiliateBlock from '@/components/AffiliateBlock';

<AffiliateBlock
  title="Luxury Outdoor Lighting System"
  description="Transform your outdoor space with this premium LED lighting system featuring smart home integration and weather-resistant design."
  image="/images/product-lighting.jpg"
  productName="Smart Outdoor LED System"
  productBrand="LuxeLights"
  affiliateUrl="https://amazon.com/dp/ASIN"
  price="$299.99"
  rating={4.8}
  badge="Best Seller"
/>
```

### AffiliateGrid (Multiple Products)

Use for showcasing multiple related products:

```tsx
import AffiliateGrid from '@/components/AffiliateGrid';

<AffiliateGrid
  title="Recommended Lighting Fixtures"
  subtitle="Curated products to enhance your luxury home design"
  products={[
    {
      id: '1',
      name: 'Smart Outdoor Lights',
      brand: 'LuxeLights',
      description: 'Weather-resistant LED system',
      image: '/images/product-1.jpg',
      price: '$299.99',
      rating: 4.8,
      affiliateUrl: 'https://amazon.com/dp/ASIN1',
      badge: 'Best Seller',
    },
    // ... more products
  ]}
  columns={3}
/>
```

### Adding Affiliate Links

1. Find Amazon product ASINs (product IDs)
2. Create affiliate links using your Amazon Associates account
3. Replace URLs in components with your affiliate links
4. Include the Amazon Associates disclosure (already included in components)

---

## Deployment to GitHub Pages

### Step 1: Connect GitHub Repository

1. Go to your GitHub repository (`https://github.com/Steynzville/Blogsite`).
2. Navigate to **Settings** → **Pages**.
3. Under "Build and deployment", select "GitHub Actions" as the source.
4. The workflow will automatically be recognized and run on pushes to the `main` branch.

### Step 2: Verify GitHub Pages Configuration

Your GitHub Actions workflow (`.github/workflows/deploy.yml`) is already configured to:
- **Build command**: `pnpm run build`
- **Publish directory**: `dist`

Ensure that in your repository's **Settings** → **Pages**, the "Source" is set to "GitHub Actions" and the workflow is selected.

### Step 3: Set Environment Variables (Optional)

Only public configuration belongs in `VITE_*`. For newsletter links set the repository variable `VITE_NEWSLETTER_FORM_URL` to the verified hosted form URL. Do not expose private tokens through build variables, even if their source is a GitHub secret. See VELUCE_OPERATING_SYSTEM.md for deployment and key-remediation gates.

### Step 4: Formspree Spam Protection

1. In your Formspree dashboard, enable **CAPTCHA** for spam protection.
2. This provides additional spam filtering and form management.

---

## Testing

### Test Contact Form

1. Navigate to `/contact` on your live site
2. Fill out the form with test data
3. Submit the form
4. Verify you receive an email at `steyn.enslin@heatrecovery.co.za`
5. Check Formspree dashboard for submission records

### Test Newsletter Signup

1. Navigate to the homepage
2. Scroll to the newsletter section
3. Enter a test email address
4. Check the GDPR consent checkbox
5. Click **Subscribe**
6. Verify the success message appears
7. Check MailerLite audience for the new subscriber
8. Verify you receive a confirmation email

### Test Affiliate Components

1. Add affiliate components to an article using the examples above
2. Verify images load correctly
3. Test affiliate links open in new tabs
4. Verify the current merchant-neutral affiliate disclosure appears before the CTA

---

## Troubleshooting

### Formspree Issues

| Issue | Solution |
|-------|----------|
| Form submissions not received | Verify form ID is correct in Contact.tsx |
| CORS errors | Ensure Formspree endpoint is correct |
| Spam submissions | Enable CAPTCHA in Formspree settings |

### MailerLite Issues

| Issue | Solution |
|-------|----------|
| Subscribers not appearing | Check the public hosted form configuration in the existing provider account |
| CORS errors | Use the public hosted form; do not call private APIs in the browser |
| Emails not sent | Verify sender email is verified in MailerLite |

### General Issues

| Issue | Solution |
|-------|----------|
| Build fails | Run `npm install` and `npm run build` locally |
| GitHub Actions deploy fails | Check build logs in GitHub Actions |
| Dark mode not working | Clear browser cache and hard refresh |

---

## Security Best Practices

1. **Never commit API keys** to GitHub. Use environment variables instead.
2. **Use HTTPS** for all external API calls (already enforced)
3. **Enable CAPTCHA** on Formspree to prevent spam
4. **Monitor submissions** regularly in Formspree and MailerLite dashboards
5. **Keep dependencies updated** by running `npm update` regularly

---

## Support & Resources

- **Formspree Documentation**: https://formspree.io/docs
- **MailerLite Documentation**: https://mailerlite.com/help
- **GitHub Pages Documentation**: https://docs.github.com/en/pages
- **GitHub Actions Documentation**: https://docs.github.com/en/actions
- **GDPR Compliance**: https://gdpr-info.eu/

---

## Next Steps

1. ✅ Set up Formspree account and get form ID
2. ✅ Verify the existing public newsletter form
3. ✅ Update Contact.tsx with Formspree ID
4. ✅ Configure the public hosted newsletter URL
5. ✅ Deploy to GitHub Pages
6. ✅ Test all integrations
7. ✅ Monitor submissions and subscribers

---

**Last Updated**: June 2026  
**Status**: Legacy integration examples; current release gates are in VELUCE_OPERATING_SYSTEM.md
