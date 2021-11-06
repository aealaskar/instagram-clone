const LocalStrategy = require("passport-local").Strategy;
const UserV2 = require("../models/UserV2");
const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await UserV2.findOne({ username: username });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return done(null, user);
      } else {
        return done(null, error);
      }
    } else {
      return done(null, false); //throws a 401 error
    }
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  { jwtFromRequest: fromAuthHeaderAsBearerToken(), secretOrKey: JWT_SECRET },
  async (payload, done) => {
    if (Date.now() > payload.expiresIn) {
      return done(null, false);
    }
    try {
      const user = await UserV2.findById(payload._id);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
