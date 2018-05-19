import Passport from 'passport';
import GithubStrategy from 'passport-github';
import { devConfig } from '../../config/development';
import User from '../user/user.model';

export const configGithubStrategy = () =>{
    Passport.use(new GithubStrategy.Strategy({
        clientID: devConfig.github.clientId,
        clientSecret: devConfig.github.clientSecret,
        callbackURL: devConfig.github.callbackURL
    }, async (token, tokenSecret, profile, done) => {
        try{
        const user = await User.findOne({'github.id': profile.id});
        if(user){
            return done(null, user);
        }
        const newUser = new User();
        newUser.github.id = profile.id;
        newUser.github.token = token;
        newUser.github.displayName= profile.displayName;
        newUser.github.email = profile.emails[0].value;
        await newUser.save();
        return done(null, newUser)
        }catch(err){
            console.error(err);
            return done(err);
        }
    })
    )
}