
const createStripe = require("stripe");
const stripe = createStripe(process.env.STRIPE_API_SECRET)


async function handlePayment (req, res) {
    try {
        const { stripeToken, title, amount } = req.body
        if(!stripeToken || !amount) {
            throw { status: 401, message: "Unauthorize" }
        }
        const responseFromStripe = await stripe.charges.create({
            amount: (amount * 100).toFixed(0),
            currency: "eur",
            description: `Payment from Vinted for ${title}`,
            source: stripeToken
        })
        res.json(responseFromStripe.status)
        
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}

module.exports = handlePayment;