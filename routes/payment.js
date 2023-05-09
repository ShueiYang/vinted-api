const express = require("express");
const payRoute = express.Router();
const handlePayment = require("../controllers/paymentController/handlePayment");
const isAuthenticated = require("../middleware/isAuthenticate");

payRoute.post("/", isAuthenticated, handlePayment);

module.exports = payRoute;