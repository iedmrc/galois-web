const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const rateLimit = require("express-rate-limit");
require('dotenv').config()

// Controllers
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

app.use(cors({credentials: true, origin: true}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET));

const limiter = rateLimit({
    windowMs: 400,
    max: 1
  });

app.options('*', cors())
app.use('/', indexRouter);
app.use('/api', limiter, apiRouter);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
