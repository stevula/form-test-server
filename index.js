const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');

// db setup
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:strive/strive';
mongoose.connect(DB_URI);

// app setup
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// server setup
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port);
// eslint-disable-next-line no-console
console.log(`Server listening on: ${port}`);
