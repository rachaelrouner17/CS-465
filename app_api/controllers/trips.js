const mongoose = require("mongoose");

// Access the trips model registered by Mongoose
const Trip = mongoose.model("trips");

// Keep API writes limited to the fields represented by a trip document.
const tripFields = [
  "code", "name", "length", "start", "resort", "perPerson", "image", "description"
];

const tripFromBody = (body) => tripFields.reduce((trip, field) => {
  if (body[field] !== undefined) trip[field] = body[field];
  return trip;
}, {});

// Retrieve all trips from the database
const tripsList = async (req, res) => {
  try {
    // Query the trips collection
    const trips = await Trip.find({});

    // Return a 404 response if no trips exist
    if (!trips.length) {
      return res.status(404).json({ message: "No trips found" });
    }

    // Return the trips as JSON with a successful status
    return res.status(200).json(trips);
  } catch (err) {
    // Return a server error if the database request fails
    return res.status(500).json({ message: err.message });
  }
};

// Retrieve one trip using its trip code
const tripsFindByCode = async (req, res) => {
  try {
    // Read the trip code from the URL parameter
    const tripCode = req.params.tripCode;

    // Search MongoDB for a matching trip
    const trips = await Trip.find({ code: tripCode });

    // Return a 404 response if no matching trip exists
    if (!trips.length) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Return the matching trip as JSON
    return res.status(200).json(trips);
  } catch (err) {
    // Return a server error if the database request fails
    return res.status(500).json({ message: err.message });
  }
};

// Add a new trip to the database.
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = await Trip.create(tripFromBody(req.body));
    return res.status(201).json(newTrip);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "Trip code already exists" });
    return res.status(400).json({ message: err.message });
  }
};

// Update an existing trip by its current trip code.
const tripsUpdateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      tripFromBody(req.body),
      { new: true, runValidators: true }
    );
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    return res.status(200).json(trip);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "Trip code already exists" });
    return res.status(400).json({ message: err.message });
  }
};

// Delete an existing trip by its trip code.
const tripsDeleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ code: req.params.tripCode });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Make the controller available to the routes file
module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
