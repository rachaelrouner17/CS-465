const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// Configure email and password authentication.
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (username, password, done) => {
      try {
        // Find the user and verify the submitted password.
        const user = await User.findOne({ email: username });

        if (!user) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }

        if (!user.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;
