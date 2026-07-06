# affank.com

Personal portfolio. Next.js (App Router) + Spline, deployed on Vercel.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Wire up your Spline scene

1. In Spline, publish your scene and copy the **code export URL** (ends in `scene.splinecode`).
2. In `app/page.tsx`, replace `REPLACE_ME` in the `scene` prop with that URL.

That's it. Spline auto-generates the loading poster, so there's no image to export.

The `SplineHero` component (`components/SplineHero.tsx`) uses Spline's official
Next.js entry point, which shows the auto poster while the scene loads, then swaps
in the interactive 3D. You design the rest. The CSS in `app/globals.css` is a
minimal neutral base meant to be replaced.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel: **New Project → import the repo → Deploy.** Framework auto-detects as Next.js, no config needed.
3. You'll get a live `*.vercel.app` URL in under a minute.

## Point affank.com at it (DNS cutover)

Your DNS is on Cloudflare, so the domain move happens there. HostGator stays live the whole time, so there's no downtime.

1. In the Vercel project: **Settings → Domains → add `affank.com` and `www.affank.com`.** Vercel shows the records it needs (an A record and a CNAME).
2. In **Cloudflare → DNS** for affank.com: delete the old records pointing at HostGator, add the ones Vercel gave you. Set them to **DNS only (grey cloud)** at first so Vercel can issue the SSL cert.
3. Wait for `affank.com` to load this site over HTTPS (usually minutes). Then you can flip Cloudflare proxying (orange cloud) back on if you want.
4. Once the new site is live and verified, **cancel HostGator.**

### Before you cancel HostGator

Check where the domain is *registered* (DNS being on Cloudflare doesn't tell you). If `affank.com` is registered through HostGator, transfer it to Cloudflare Registrar first (at-cost, no markup) so canceling hosting doesn't put the domain at risk. If it's registered elsewhere, ignore this.

## Cost

$0 for hosting on Vercel's free tier. A four-page portfolio, even with a chunky Spline hero, won't come close to the limits. Only ongoing cost is the domain renewal.
