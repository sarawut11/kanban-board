/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import render from './render';
import api from './api';
import getBoard from './getBoard';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(
  process.env.MLAB_URL || 'mongodb+srv://user:kLVwPbiqiEBVgtJ9@cluster0-gs3q6.mongodb.net/test?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology: true}
);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('dist/public'));
app.use('/api', api(db));
app.use(getBoard(db));
app.get('*', render);

app.listen(port, () => console.log(`🆗 👉 http://localhost:${port}`));
