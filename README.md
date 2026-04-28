# Stripe Book Purchase Demo App

## Overview

This is a demo Node.js app that showcases a simple **book purchase flow** with payment integration using the **Stripe** platform.

The app lets a user:
1. Select a book from a catalog
2. Go to checkout
3. Complete payment through Stripe Payment Element
4. View a success page after confirmation

---

## Stripe Setup

To integrate this app with Stripe, create a Stripe demo/test account and generate API keys:

**In order to integrate this app with Stripe you need to generate your API keys with a demo account [here](https://dashboard.stripe.com/register)**

Copy the following keys, Keep the keys we will need them for setup:

- **Publishable key** (`pk_test_...`) for frontend initialization
- **Secret key** (`sk_test_...`) for backend PaymentIntent creation

---

## Prerequisites

- Node.js (v19+ recommended for this app): Find more information about installing node [here] (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- npm (v9+ recommended for this app)
- ```node -v``` will give you node version
- Stripe demo/test account

---

## Project Setup

1. Install dependencies:

```bash

git clone https://github.com/salkhan-139/salman-khan-takehome-project-node
cd salman-khan-takehome-project-node
npm install

```

Your application is almost set. Copy sample.env to .env or simply rename it.

```
cp sample.env .env
```

- **Publishable key** (`pk_test_...`) : Populate it from your Stripe Dashboard
- **Secret key** (`sk_test_...`) : Populate it from your Strip Dashboard
- **Session Secret** (`sk_test_...`) : generate a long random key using
```
openssl rand -base64 48
```

Once you have copied all the details in the .env file.

Run the application with npm on your root project directory. 
```
npm start
``` 
Navigate to [http://localhost:3000](http://localhost:3000) to view the index page.

---

## Test the Solution locally

- Chose one book on the screen, Click on the purchase button.
- Enter your email ID (or any valid email ID)
- Select Card for the payment type (Default)
- For the sake of the demo use the following details 
  - **Card number** : `4242 4242 4242 4242` 
  - **Expiry Date** : Use any future expiry date
  - **CVC** : 123
- Enter Valid post code, and enter other details as requested.
- Click Pay
- Notice the Success Message with the payment details `amount` and `Payment Intent ID: pi_...`

---

## Current Architecture 

- It’s more of a monolith, where the backend and front-end are not truly separate. 
- One Node/Express app process, server-rendered views, and a Stripe-backed payment flow, with a few important basic security implementations.
- At a high level, the app follows a MVC-style server-rendered web architecture:
- **Model:** config/catalog.js (server-trusted product + pricing config) a quick modification to avoid client side product tampering. 
- **Controller layer:** route handlers in app.js (/, /checkout, /create-payment-intent, /success).
- **View layer:** Handlebars templates in views/ (index.hbs, checkout.hbs, success.hbs, layout in views/layouts/main.hbs).
- **Integration:** Stripe API calls from backend only, Making it more secure. 

## Architecture trade-off made so far:

- Stick to Server-side rendering with Handlebars (.hbs)
- Kept Express + Handlebars instead of moving to React/tsx, for lower engineering efforts and near full rewrite. Also a scope for an upgrade to React/tsx.
- The app is still mostly in app.js (single deployable unit).

**While most of the app architecture is kept intact, some critical changes had to be made to introduce a basic level of security.** 

- Introduced a boundary by moving catalog/pricing to config/catalog.js (backend). Preparing before splitting into route/service modules in future.
- Critical architectural decision: pricing is treated as server decision, not client authority.
- Introduced SESSION_SECRET and session usage to bind checkout state to make sure it’s the same user doing checkout.

**What it is not (yet):**
- Not a SPA architecture.
- Not clean/layered architecture with strict module separation yet.
- Not event-driven architecture yet.

---

## My Approach: (Agile: Learn, build, repeat): This is sprint-1. 

**Research/Learn (Stripe payment API):**
- Learn about Stripe Payment Element and compare it with my existing knowledge of payment integrations such as PayPal element, where you get a JS and html element to copy paste. 
- Used this YouTube [video](https://www.youtube.com/watch?v=aW6AcSR1Oyg) as a starting point to understand Stripe Checkout Flow, Payment Element, embedded and redirect. 

**Build MVP** 
- **First impression** 
  - Uses hbs (handlers) : not very modern
  - A complete monolith : No separation of concern (backend-frontend)
  - Everything is in app.js , generally we have server.js and app.js and other supporting js files, defining boundaries clearly.
  - Missing integration to Stripe payment (expected)
  - Noticing the placeholders - helped understanding the task further.
  - Hard coded item list, no Database, or not even a model for it.
  - Use of Query parameters (Not a best practice)
     
- **Decisions and dilemmas (Challenges)** 
  - Thought about migrating to React, however in real life, you rarely change the entire architecture without consulting the user. 
  - Keeping the user first in mind, Decided to implement the feature requested without over-engineering and leave the upgrades for further consultations. 
  - Not to over-engineer the solution.
  - Build the MVP and iterate over it to improve the quality.
  - Got the payment integration working and testing the API success.
  - Decision to include critical security fixes: Decided to fix absolute critical security loopholes as part of MVP, leaving other major changes for the roadmap. Therefore a necessary and explainable       changes were made such as, 
    -  Moving items and the API interaction to the backend, saving the application from potential request tampering.
    -  Introduced session to double down on this protection.
- **Use of AI**
  - Whilst I generally use codex or vibe coding for my mini projects/ POCs, I decided not to use them extensively (writing code on my behalf) for the sake of my own understanding.
  - AI definitely helped me with hbs files which I have little experience with. I knew that they’re not far off from any other JS frameworks out there, but use of AI definitely cuts down the time to        experiment and learn significantly.

## APIs used and Documents reffered:

- Payment Intents API : https://docs.stripe.com/api/payment_intents
- https://docs.stripe.com/api
- https://docs.stripe.com/payments/payment-element/best-practices
- https://docs.stripe.com/payments/link/add-link-elements-integration
- https://docs.stripe.com/js/elements_object/create_payment_element
- YouTube Video : https://www.youtube.com/watch?v=aW6AcSR1Oyg

---
	
## Target Architecture: 

- Clear separation of concerns: Separate backend and frontend, introduce services.
- Easier testing (routes/services isolated)
- Safer payment (webhook) : I am sure there are more security related aspects Stripe APIs might cover.
- Introduce a DB for catalog

## Immediate Next Steps:
- Migrate to React/tsx with routes: Front-end
- Build solid Python/NextJS: Backend  
- Use Services : Checkout, Payment, Catalog

## Proposed features (production-ready MVP):
- Login
- Cart
- Orders
- Support


