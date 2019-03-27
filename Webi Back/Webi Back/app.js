const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


mongoose.connect('mongodb://localhost:27017/AdminDB',  { useNewUrlParser: true, useCreateIndex: true})
    .then(()=>{console.log("MongoDb has connected")})
    .catch(e=>console.log(e));



const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.use('/public', express.static('public'));


const admin = require('./admin/routes/admin');
const post = require('./api/routes/post');
const portfolio = require('./api/routes/portfolio');
const media = require('./api/routes/media');
const setting = require('./api/routes/setting');
const page = require('./api/routes/page');
const team = require('./api/routes/team');

app.use('/admin', admin);
app.use('/api/post', post);
app.use('/api/portfolio', portfolio);
app.use('/api/media', media);
app.use('/api/setting', setting);
app.use('/api/page', page);
app.use('/api/team', team);



// app.use(function (err, req, res, next) {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!!');
// });

app.listen(3000, ()=>console.log("Server running 3000 ... "));