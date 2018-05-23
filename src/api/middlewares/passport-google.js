import Passport from 'passport';
import GoogleStrategy from 'passport-google-oauth';
import { devConfig } from '../../config/development';
import User from '../user/user.model';

export const configGoogleStrategy = () => {
    Passport.use(new GoogleStrategy.OAuth2Strategy({
        clientID: devConfig.google.clientId,
        clientSecret: devConfig.google.clientSecret,
        callbackURL: devConfig.google.callbackURL
    },
  async (accessToken, refreshToken, profile, done) => {
      try{
       const user = await User.findOne({'google.id': profile.id});
       if(user){
           return done(null, user);
       }
       const newUser = new User({});
       newUser.google.id = profile.id;
       newUser.google.token= accessToken;
       newUser.google.displayName = profile.displayName;
       newUser.google.email = profile.emails[0].value;
       await newUser.save();
       return done(null, newUser);
      }
      catch(err){
          console.error(err);
          return done(err);
      }
  }
  )
)
}