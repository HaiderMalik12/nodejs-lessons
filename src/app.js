import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import { userRouter } from './api/user';
import { configureJWTStrategy } from './api/middlewares/passport-jwt';

const app = express();
const PORT = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/eh_db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
configureJWTStrategy();
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
