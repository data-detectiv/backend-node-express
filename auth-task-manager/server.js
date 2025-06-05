const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT')
const credentials = require('./middleware/credentials');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;


connectDB();
// middlewares
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/users', require('./routes/api/users'));
app.use('/tasks', require('./routes/api/tasks'));

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('MongoDB connected!');
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
});

