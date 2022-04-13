const passport = require("passport");
const passportJWT = require("passport-jwt");

const User = require("../models/Users");

const { SECRET_KEY } = process.env;

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: SECRET_KEY,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const { user } = jwt_payload;
        const __user = await User.findOne({ email: user });
        if (!__user) return done(null, false);
        done(null, __user);
      } catch (error) {
        done(error, false);
      }
    })
  );
};
