const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController')

router.route('/')
    .get(booksController.getAllAuthors)
    .put(booksController.updateAuthor)
    .post(booksController.createNewAuthor)
    .delete(booksController.deleteAuthor)
    .get(booksController.getAuthor)

module.exports = router;