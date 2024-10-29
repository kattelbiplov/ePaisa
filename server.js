const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 5500;

// Allow all origins
app.use(cors()); // This will allow all origins

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data
app.use(cookieParser());

const dbConfig = require('./config/dbConfig');
const userRoute = require('./routes/userRoutes');
const transactionRoute = require('./routes/transactionRoutes');
const customerServiceRoute = require('./routes/customerServiceRoutes');

app.use('/api/users', userRoute);
app.use('/api/users', transactionRoute);
app.use('/api/users', customerServiceRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
