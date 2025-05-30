const {v4: uuid } = require('uuid');
const data = {
    authors: require('../model/books.js'),
    setAuthor: function (data) {this.authors = data}
};

const getAllAuthors = (req, res) => {
    res.json(data.authors);
};

const createNewAuthor = (req, res) => {
    const newAuthor = {
        id: uuid(),
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    }
    if (!newAuthor.title || !newAuthor.author) {
        return res.status(400).json({ 'message': 'Title and Author are required'});
    }
    data.setAuthor([...data.authors, newAuthor]);
    res.status(201).json(data.authors);
};

const updateAuthor = (req, res) => {
    const author = data.authors.find(emp => emp.id === parseInt(req.body.id));
    if (!author) {
        return res.status(400).json({ 'message': `Author with ID ${req.body.id} not found`});
    }
    if (req.body.title) author.title = req.body.title;
    if (req.body.author) author.author = req.body.author;
    if (req.body.year) author.year = req.body.year;

    const filteredArray = data.authors.filter(emp => emp.id !== parseInt(req.body.id))
    const unsortedArray = [...filteredArray, author]
    data.setAuthor(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.authors);
};

const deleteAuthor = (req, res) => {
    const author = data.authors.find(emp => emp.id === parseInt(req.body.id));
    if (!author) {
        return res.status(400).json({ 'message': `Author with ID ${req.body.id} not found`});
    }
    const filteredArray = data.authors.filter(emp => emp.id !== parseInt(req.body.id));
    data.setAuthor([...filteredArray])
    res.json(data.authors);

};

const getAuthor = (req, res) => {
    const author = data.authors.find(emp => emp.id === parseInt(req.params.id));
    if (!author) {
        return res.status(400).json({ 'message': `Author with ID ${req.params.id} not found`});
    }
    res.json(author);
};

module.exports = {
    getAllAuthors,
    createNewAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthor
};