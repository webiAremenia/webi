import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';


import api from './api/routes/api';
import adminRoutes from './admin/routes/admin';

const app = express();

// mongoDB settings -->

const mongoDB = process.env.MONGO_ATLAS_PW;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// ------------------->

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/uploads', express.static(__dirname + '/_uploads'));
app.use('/admin', adminRoutes);
app.use('/api', api);


//----------- Connect to Angular client

app.use('/admin-panel', express.static(__dirname + '/../../admin/dist/Client'));
app.use('/admin-panel/*', express.static(__dirname + '/../../admin/dist/Client'));

app.use('/', express.static(__dirname + '/../../front/dist/webiFront'));
app.use('/*', express.static(__dirname + '/../../front/dist/webiFront'));

// app.use(express.static(__dirname + '/../../front/dist/webiFront'));
// app.use(express.static(__dirname + '/../../admin/dist/client'));
//
// app.get('/admin-panel', function (req, res) {
//     console.log(__dirname + '/../../admin/dist/client/index.html');
//     res.sendFile(path.join(__dirname + '/../../admin/dist/client/index.html'));
// });
// app.get('/admin-panel/*', function (req, res) {
//     res.sendFile(path.join(__dirname + '/../../admin/dist/client/index.html'));
// });
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + '/../../front/dist/webiFront/index.html'));
// });
//
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname + '/../../front/dist/webiFront/index.html'));
// });

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    res.status(err.status).json({error: err.message})
});
app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({error: err.message});
});

module.exports = app;
