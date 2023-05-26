const express = require("express");
const router = express.Router();
const billingController = require("../controllers/billing.controller");
const auth = require("../_middlewares/authorize");

//get all prices
router.get("/prices", auth, billingController.getPrices);

//get stripe´s price trough priceId
router.get("/onePrice", billingController.getOnePrice);

//check subscription´s status
router.get("/getSubscriptionStatus", billingController.subscriptionStatus);

//Check all the data of a client, the status of your subscription, I check that it exists in Stripe,
//checks the status of your subscription with Stripe if you have it and compares it with the information of that user and subscription that we have in our database
//If necessary, update the DB with the information obtained, if the subscription has been renewed (through the last date saved in the DB)
router.put("/getOneCustomer", auth, billingController.getOneCustomer);

//check Last Transaction
//put || get
router.get("/getLastTransaction", billingController.checkLastTransactions);

//get All customers
router.get("/getAllCustomers", billingController.getAllActiveCustomers);

//delete subscription
router.put(
  "/deleteUserSubscription",
  auth,
  billingController.deleteSubscription
);

//update db (export && render) after payment
router.put("/updateBuyItem", billingController.updateAfterBuyOneItem);

//check subscription´s status
//PUT || GET
router.put(
  "/checkPurchases",
  auth,
  billingController.getAndCheckCurrentSubscription
);

//get user purchases
router.get("/userCharges", billingController.getUserPurchases);

//create payment intent
router.put("/createPaymentIntent", billingController.createPaymentIntent);

module.exports = router;
