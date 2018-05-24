import express from 'express';
import userController from './user.controller';
import passport from 'passport';
export const userRouter = express.Router();

userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/download-pdf', userController.generatePdf);

//auth
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

userRouter.get('/auth/github', passport.authenticate('github'));
userRouter.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  userController.authSuccess
);
userRouter.get('/auth/google',
 passport.authenticate('google',{
   scope: ['profile','email']
 })
);
userRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  userController.authSuccess
);