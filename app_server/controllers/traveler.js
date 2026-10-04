// API endpoint used by the website controller
const tripsEndpoint = "http://localhost:3000/api/trips";

// Options for the API request
const options = {
  method: "GET",
  headers: {
    Accept: "application/json"
  }
};

// Render the travel page using data from the REST API
const travel = async (req, res) => {
  try {
    // Request trip data from the API
    const response = await fetch(tripsEndpoint, options);

    // Stop if the API returns an unsuccessful status
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Convert the API response into JavaScript data
    const trips = await response.json();

    let message = null;

    // Confirm that the API returned a trip collection
    if (!Array.isArray(trips)) {
      message = "API lookup error";
    } else if (trips.length === 0) {
      message = "No trips exist in the database!";
    }

    // Render the website with the API data
    res.render("travel", {
      title: "Travlr Getaways",
      trips: Array.isArray(trips) ? trips : [],
      message: message
    });
  } catch (err) {
    // Display an error if the API request fails
    res.status(500).render("error", {
      message: err.message,
      error: {}
    });
  }
};

module.exports = {
  travel
};
