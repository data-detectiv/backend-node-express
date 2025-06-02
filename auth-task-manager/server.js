const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3500;

app.use(express.json());

// middlewares
app.use(cookieParser());

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
