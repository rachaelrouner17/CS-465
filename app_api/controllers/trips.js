const mongoose = require("mongoose");

// Access the trips model registered by Mongoose
const Trip = mongoose.model("trips");

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

// Make the controller available to the routes file
module.exports = {
  tripsList,
  tripsFindByCode
};
