# LoomCraft Rug Spa - Landing Page That Books Quotes

Live demo: https://loomcraft-rug-spa.vercel.app

High converting landing page for a rug cleaning business. Built to turn visitors into quote requests in under 60 seconds.

## What this is
A complete local service page with one goal: get the quote form filled. It sells the outcome first, removes risk with a guarantee, then asks for name, email, phone and rug details.

## Features for conversion
- Hero with promise: rugs look new again in 7 days or we reclean free
- Trust row: 4.9/5 rating, 3,200 plus rugs restored, 14 day guarantee
- Services: deep hand wash, stain and pet odor removal, Persian care, protection
- 3 step process: quote, free pickup, delivery
- Simple pricing, reviews, FAQ and sticky quote CTA
- Mobile first layout with fast load, no framework

## Lead capture with n8n
The form in `index.html` posts JSON to an n8n webhook. `main.js` handles validation, loading state and success message.

1. In n8n create a Webhook node and copy the Production URL
2. Open `main.js` and set `N8N_WEBHOOK_URL` to your URL
3. Fields sent: name, email, phone, message, page, submittedAt
4. In n8n add Google Sheets, Gmail or Slack to store and notify

## Tech stack
- Static HTML, CSS in `styles.css`, JS in `main.js`
- Google Fonts: Fraunces + Manrope
- Deployed on Vercel, works anywhere static

## Files
- `index.html`: page structure and quote form
- `styles.css`: full styling
- `main.js`: menu, FAQ, scroll reveal and n8n form post

## Want one like this?
I build landing pages for local businesses with instant n8n lead capture to Sheets, email or CRM. Ideal for Upwork clients who want more calls without extra ad spend.

Live demo again: https://loomcraft-rug-spa.vercel.app
