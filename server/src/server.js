import 'module-alias/register'

import http from 'http';
import app from './app';

// process.env.NODE_ENV = 'development';

// uncomment below line to test this code against staging environment
// process.env.NODE_ENV = 'staging';

// config variables
const config = require('../config/config.js');

// app.get('/', (req, res) => {
//     res.json(global.gConfig);
// });


// const port = process.env.PORT || 8888;

const server = http.createServer(app);

server.listen(global.gConfig.node_port, () => {
    console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`);
});