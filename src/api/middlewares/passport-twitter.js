import Passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import { devConfig } from '../../config/development';
import User from '../user/user.model';

export const configTwitterStrategy = () => {
  Passport.use(
    new TwitterStrategy.Strategy(
      {
        consumerKey: devConfig.twitter.consumerKey,
        consumerSecret: devConfig.twitter.consumerSecret,
        callbackURL: devConfig.twitter.callbackURL
      },
      async (token, tokenSecret, profile, done) => {
        try {
          const user = await User.findOne({ 'twitter.id': profile.id });
          if (user) {
            return done(null, user);
          }
          const newUser = new User();
          newUser.twitter.id = profile.id;
          newUser.twitter.username = profile.username;
          newUser.twitter.token = token;
          newUser.twitter.displayName = profile.displayName;
          await newUser.save();
          return done(null, newUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
