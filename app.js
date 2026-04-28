const session = require("express-session");
const catalog = require("./config/catalog");

require('dotenv').config();
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

console.log("Stripe Secret:"+stripe)

var app = express();

// view engine setup (Handlebars)
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json({}));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-only-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax" },
  })
);

/**
 * Home route
 */
app.get('/', function(req, res) {
  res.render('index');
});

/**
 * Checkout route
 */
app.get('/checkout', function(req, res) {

  const item = req.query.item;
  let title, amount, error;
  console.log("Items:"+item);

  switch (item) {
    case '1':
      title = "The Art of Doing Science and Engineering"
      amount = 2300      
      break;
    case '2':
      title = "The Making of Prince of Persia: Journals 1985-1993"
      amount = 2500
      break;     
    case '3':
      title = "Working in Public: The Making and Maintenance of Open Source"
      amount = 2800  
      break;     
    default:
      // Included in layout view, feel free to assign error
      error = "No item selected"      
      break;
  }


  res.render('checkout', {
    title: title,
    amount: amount,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    error: error
  });
});


/**
 * Payment Intent route
 */
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { item } = req.body;
    const product = catalog[item];

    if (!product) {
      return res.status(400).json({ error: 'Invalid item' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.amount, // Coming from server (Can't be tampered)
      currency: product.currency,
      automatic_payment_methods: { enabled: true },
      metadata: { item: product.id },
    });

    req.session.checkout = {
      item: product.id,
      amount: product.amount,
      paymentIntentId: paymentIntent.id,
    };

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


/**
 * Success route
 */
app.get('/success', async function(req, res) {
  try {
    const paymentIntentId = req.query.payment_intent;
    const checkout = req.session.checkout;

    if (!checkout || !paymentIntentId) {
      return res.status(400).render('success', { error: 'Missing checkout context' });
    }

    if (checkout.paymentIntentId !== paymentIntentId) {
      return res.status(403).render('success', { error: 'Payment mismatch' });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(202).render('success', {
        error: 'Payment not completed yet',
        paymentIntentId: paymentIntent.id,
        amount: (paymentIntent.amount || 0) / 100,
      });
    }

    return res.render('success', {
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100, // Display in USD
      currency: paymentIntent.currency,
    });
  } catch (err) {
    return res.status(500).render('success', { error: 'Unable to verify payment' });
  }
});


/**
 * Start server
 */
app.listen(3000, () => {
  console.log('Getting served on port 3000');
});
