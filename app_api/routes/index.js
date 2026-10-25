const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const authenticationController = require("../controllers/authentication");

// Require a valid Bearer JWT for administrative trip mutations.
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header required."
    });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      message: "Authorization format must be Bearer token."
    });
  }

  jwt.verify(parts[1], process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(401).json({
        message: "Invalid or expired token."
      });
    }

    req.user = user;
    next();
  });
};

// Register a new user.
router.post("/register", authenticationController.register);

// Log in and receive a JWT.
router.post("/login", authenticationController.login);

// Import the trips API controller
const tripsController = require("../controllers/trips");

// Route GET /api/trips to the tripsList controller method
router.get("/trips", tripsController.tripsList);

// Route GET /api/trips/:tripCode to the single-trip controller
router.get(
  "/trips/:tripCode",
  tripsController.tripsFindByCode
);

// POST /api/trips creates a trip.
router.post(
  "/trips",
  authenticateJWT,
  tripsController.tripsAddTrip
);

// PUT /api/trips/:tripCode updates a trip.
router.put(
  "/trips/:tripCode",
  authenticateJWT,
  tripsController.tripsUpdateTrip
);

// DELETE /api/trips/:tripCode removes a trip.
router.delete(
  "/trips/:tripCode",
  authenticateJWT,
  tripsController.tripsDeleteTrip
);

// Make this router available to app.js
module.exports = router;
