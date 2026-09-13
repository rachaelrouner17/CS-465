const express = require("express");
const router = express.Router();
const controller = require("../controllers/traveler");

router.get("/", controller.travel);

module.exports = router;
