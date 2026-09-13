
/* loads express */
const express = require("express");

/* create route manager */
const router = express.Router();

/* loads the controller */
const ctrlMain = require("../controllers/main");

/* GET home page. */
router.get("/", ctrlMain.index);

/* make the rout available to the main app */
module.exports = router;
