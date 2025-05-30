const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController')

router.route('/')
    .get(booksController.getAllAuthors)
    .post(booksController.createNewAuthor)
    .put(booksController.updateAuthor)
    .delete(booksController.deleteAuthor);
    
router.route('/:id')
    .get(booksController.getAuthor)

module.exports = router;