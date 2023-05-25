require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);