import express from 'express';
import userController from './user.controller';
import passport from 'passport';
export const userRouter = express.Router();

userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get(
  '/authenticate',
  passport.authenticate('jwt', { session: false }),
  userController.authenticate
);

userRouter.get('/auth/twitter', passport.authenticate('twitter'));
userRouter.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  userController.authSuccess
);
