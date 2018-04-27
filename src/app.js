import express from 'express';
import mongoose from 'mongoose';

import { userRouter } from './api/user'
const app = express();
const PORT = 3000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/eh_db');
app.use(express.json())
app.use(express.urlencoded());
app.use('/users', userRouter);
app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`)
})