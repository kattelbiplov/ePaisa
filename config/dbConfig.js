const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongo_url);

const connectionResult = mongoose.connection;

connectionResult.on('error', () => {
    console.log('Connection error');
});

connectionResult.on('connected', () => {
    console.log('Database connected');
});
