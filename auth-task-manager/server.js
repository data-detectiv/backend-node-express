const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3500;

app.use(express.json());

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
