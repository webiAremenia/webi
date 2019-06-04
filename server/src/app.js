import '../config/config.js';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import morgan from 'morgan';
import cors from 'cors';

import winston from '../config/winston';
import api from './api/routes/api';
import adminRoutes from './admin/routes/admin';
import clientRoutes from './client/routes/client';

require('./seed').createDef(); //Creat default tables

const app = express();

// mongoDB settings -->

const mongoDB = global.gConfig.database;
mongoose.connect(mongoDB, {useNewUrlParser: true, useCreateIndex: true})
    .then(_ => {
        console.log('MongoDB has connected ...')
    })
    .catch(err => {
        console.log('Error MongoDB not connected ...')
    });
// ------------------->

app.use(morgan('combined', { stream: winston.stream }));
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/uploads', express.static(__dirname + '/_uploads'));
app.use('/admin', adminRoutes);
app.use('/api', api);
app.use('/client', clientRoutes);

//----------- Connect to Angular client

app.use('/admin-panel', express.static(__dirname + '/../../admin/dist/Client'));
app.use('/admin-panel/*', express.static(__dirname + '/../../admin/dist/Client'));

app.use('/', express.static(__dirname + '/../../front/dist/webiFront'));
app.use('/*', express.static(__dirname + '/../../front/dist/webiFront'));

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    res.status(err.status).json({error: err.message})
});
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
// add this line to include winston logging
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
// render the error page
    res.status(err.statusCode).json({error: err.message});
});

module.exports = app;
