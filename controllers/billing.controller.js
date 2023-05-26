const { Subscription } = require('../models/subscription.model');
const { User } = require('../models/user.model');

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);


//get all stripe´s prices
    const getPrices = async (req, res) => {
        const prices = await stripe.prices.list({
            active: true,
        });
        res.json(prices.data.reverse());
};

//get one stripe´s price and item´s details
const getOnePrice = async (req, res) => {
    const { id } = req.params;
    const price = await stripe.prices.retrieve(id);
    res.json(price);
};

//get one customer
const getOneCustomer = async (req, res) => {
    const { email } = req.body;

    try{
        const customer = await stripe.customers.list({
            email: email,
        });
        res.json(customer);

        const id = customer.data.length > 0 ? customer.data[0].id : "0";

        if (id === "0") {
            return res.status(200).json("No customer found");
        }

        const subscriptions = await stripe.subscriptions.list({
            customer: id,
        });

        if (subscriptions.data.length) {
            const currentEnd = subscriptions.data[0].current_period_end.toString();
            const subsCode = subscriptions.data[0].id;
            const priceCode = subscriptions.data[0].plan.id;

            const subscription = await Subscription.findOne({ where: { price_code: priceCode } });

            if (subscription) {
                const user = await User.findOne({ where: { email: email } });

                if (user) {
                    const subs_end_user = user.subscription_end;

                    const updateValues = {
                        subscription_end: currentEnd,
                        subscription_code: subsCode,
                        subscription_id: subscription.subscription_id,
                        subscription_status: true,
                    };

                    if (subs_end_user < parseInt(currentEnd)) {
                        updateValues.cont_export = 0;
                        updateValues.cont_render = 0;
                    }

                    await User.update(updateValues, { where: { email: email } });

                    return res.status(200).json("Subscription updated");
                } else {
                    return res. status(400).json({ error: "User not found" });
                }
            } else {
                return res.status(400).json({ error: "Subscription not found" });
            }
        } else {
            const user = await User.findOne({ where: { email: email } });

            if (user) {
                const time = new Date().getTime();

                if (user.subscription_end < time && user.subscription_end != 0) {
                    await User.update(
                        {
                            subscription_code:"",
                            subscription_end: 0,
                            subscription_id: 1,
                            subscription_status: false,
                        },
                        { where: { email: email } }
                    );

                    return res.status(200).json("Ok");
                } else {
                    return res.status(200).json("There is no subscription or anything to update");
                }
            } else {
                return res.status(400).json({ error: "User not found" });
            }
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updateAfterBuyOneItem = async (req, res) => {
    const { email, last_payment_stripe, project_id, option } = req.body;

    let updateValues = {};

    if (option === 1) {
        updateValues = { cont_export: sequelize.literal('cont_export - 1'), last_single_payment_code: last_payment_stripe };
    } else if (option === 2) {
        updateValues = { cont_render: sequelize.literal('cont_render - 1'), last_single_payment_code: last_payment_stripe };
    }

    try {
        const [numAffectedRows, affectedRows] = await User.update(updateValues, {
            where: { email: email },
            returning: true,
        });

        if (numAffectedRows > 0) {
            return res.status(200).json(project_id);
        } else {
            return res.status(400).json({ error: "Error updating user" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getPrices,
    getOnePrice,
    getOneCustomer,
};