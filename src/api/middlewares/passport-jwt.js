import Passport from 'passport';
import PassportJWT from 'passport-jwt';
import { devConfig } from '../../config/development';
import userController from '../user/user.controller';
import User from '../user/user.model';

export const configureJWTStrategy = () => {
  const opts = {};
  opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = devConfig.secret;
  Passport.use(
    new PassportJWT.Strategy(opts, (payload, done) => {
      User.findById(payload.id, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );
};
