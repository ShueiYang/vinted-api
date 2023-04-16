const express = require("express");
const route = express.Router();

const getOffers = require("../controllers/offerController/getOffers");

route.get("/", getOffers);

module.exports = route;