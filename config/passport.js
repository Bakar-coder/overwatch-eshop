const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  config = require("config"),
  { User } = require("../models/User"),
  opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get("secretKey");

module.exports = passport =>
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await User.findOne({ where: { email: payload.email } });
        if (user) return done(null, user);
        return done(null, false);
      } catch (ex) {
        return done(ex, false);
      }
    })
  );
