// routes/booksRouter.js
const router = require('express').Router();
const { getBooks, getBooksById, createBook, updateBook, deleteBook } = require('../services/booksService.js');
const { idChecker } = require('../helper/peopleHelper.js');

router.get('/', getBooks);
router.get('/:id', idChecker, getBooksById);
router.post('/', createBook);
router.put('/:id', idChecker, updateBook);
router.delete('/:id', idChecker, deleteBook);

module.exports = router;
