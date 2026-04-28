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

** In order to integrate this app with Stripe you need to generate your API keys with a demo account [here](https://dashboard.stripe.com/register) **

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

How does the solution work? Which Stripe APIs does it use? How is your application architected?
How did you approach this problem? Which docs did you use to complete the project? What challenges did you encounter?
How you might extend this if you were building a more robust instance of the same application.

