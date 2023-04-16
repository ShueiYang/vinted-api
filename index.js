const express = require('express');
const helmet = require("helmet");
const cors = require("cors");

const userRoute = require("./routes/user");
const offerRoute = require("./routes/offer");
const offersRoute = require("./routes/offers");
const { mongoConnect } = require('./services/mongo.connect');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res)=> {
    res.send("Welcome to Vinted API 👋🌏✨🌈")
})

app.use("/user", userRoute);
app.use("/offer", offerRoute);
app.use("/offers", offersRoute);


app.all("*", (req, res) => {
    res.status(404).json({ message: "This route does not exist" });
});


async function startServer() {
    await mongoConnect();
    app.listen(PORT, () => {
        console.log(`app is running on port ${PORT} 🚀`);
    });
}

startServer();