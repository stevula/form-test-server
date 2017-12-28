const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// app setup
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

// server setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on: ${port}`);
