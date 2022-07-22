const express = require('express');
const path = require('path');
const morgan = require('morgan');

const connectDB = require('./config/_db');
require('dotenv').config({ path: path.join(__dirname, '/config/.env') });

// register app globally
global.app = express();
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
