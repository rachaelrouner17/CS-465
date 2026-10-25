const passport = require("passport");
const User = require("../models/user");

// Register a user and return a token.
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "All fields are required."
    });
  }

  try {
    const existingUser = await User.findOne({
      email: req.body.email
    });

    if (existingUser) {
      return res.status(409).json({
        message: "A user with that email already exists."
      });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email
    });

    user.setPassword(req.body.password);

    const savedUser = await user.save();

    return res.status(201).json({
      token: savedUser.generateJWT()
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

// Authenticate a user and return a token.
const login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Email and password are required."
    });
  }

  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      });
    }

    if (!user) {
      return res.status(401).json(
        info || { message: "Invalid email or password." }
      );
    }

    return res.status(200).json({
      token: user.generateJWT()
    });
  })(req, res, next);
};

module.exports = {
  register,
  login
};
