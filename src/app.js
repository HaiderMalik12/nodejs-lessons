import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import pdf from 'express-pdf';

import { userRouter } from './api/user';
import { configureJWTStrategy } from './api/middlewares/passport-jwt';
import { configTwitterStrategy } from './api/middlewares/passport-twitter';
import { devConfig } from './config/development';
import User from './api/user/user.model';
import { configGithubStrategy } from './api/middlewares/passport-github';
import { configGoogleStrategy } from './api/middlewares/passport-google';

const app = express();
const PORT = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/eh_db');

app.use(express.json());
app.use(pdf);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: devConfig.secret,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
configureJWTStrategy();
configTwitterStrategy();
configGithubStrategy();
configGoogleStrategy();
// save user into session
// req.session.user = {userId}
passport.serializeUser((user, done) => {
  done(null, user._id);
});
// extract the userId from session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(null, user);
  });
});
app.use('/users', userRouter);

app.get('/', function(req, res) {
  res.json({ msg: 'Home route' });
});
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
