import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/api/auth/google/callback",
},
  async(accessToken, refreshToken, profile, cb) => {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user && profile.emails?.[0]?.value) {
        user = await User.findOne({ email: profile.emails[0]?.value  });
        if(user) {
          user.googleId = profile.id;
          await user.save();
        }
      }
      if (!user) { // if the first condition executed , user will be defined
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails ? profile.emails[0]?.value : undefined,
        });
      }
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
))