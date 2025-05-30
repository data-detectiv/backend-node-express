const express = require('express');
const app = express()
const PORT = process.env.PORT || 3500;
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler');

app.use(logger);
app.use(express.json());

app.use('/books', require('./route/booksRouter'));

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))


