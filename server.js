require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5500;
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data
app.use(cookieParser());

const dbConfig = require('./config/dbConfig');
const userRoute = require('./routes/userRoutes');
const transactionRoute=require('./routes/transactionRoutes');
app.use('/api/users', userRoute); 
app.use('/api/users',transactionRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
