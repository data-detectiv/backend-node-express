const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT')
const PORT = process.env.PORT || 3500;

app.use(express.json());

// middlewares
app.use(cookieParser());

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/tasks', require('./routes/api/tasks'))

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
