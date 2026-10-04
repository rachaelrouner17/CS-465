const express = require("express");
const router = express.Router();

// Import the trips API controller
const tripsController = require("../controllers/trips");

// Route GET /api/trips to the tripsList controller method
router.get("/trips", tripsController.tripsList);

// Route GET /api/trips/:tripCode to the single-trip controller
router.get(
  "/trips/:tripCode",
  tripsController.tripsFindByCode
);

// Make this router available to app.js
module.exports = router;
