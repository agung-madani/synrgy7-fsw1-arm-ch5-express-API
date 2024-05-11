// services/booksService.js
const { dataBooks } = require('../dataBooks.js');

const getBooks = (req, res) => {
  res.json({ message: 'Success', data: dataBooks });
};

const getBooksById = (req, res) => {
  const { id } = req.params;
  const book = dataBooks.find(b => b.id === parseInt(id));
  if (book) {
    res.json({ message: 'Success', data: book });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

const createBook = (req, res) => {
  const { id, title, author, category } = req.body;
  const newBook = { id, title, author, category };
  dataBooks.push(newBook);
  res.status(201).json(newBook);
};

const updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author, category } = req.body;
  const bookIndex = dataBooks.findIndex(b => b.id === parseInt(id));
  if (bookIndex !== -1) {
    dataBooks[bookIndex] = { ...dataBooks[bookIndex], title, author, category };
    res.json(dataBooks[bookIndex]); // Return the updated book object
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

const deleteBook = (req, res) => {
  const { id } = req.params;
  const bookIndex = dataBooks.findIndex(b => b.id === parseInt(id));
  if (bookIndex !== -1) {
    const deletedBook = dataBooks.splice(bookIndex, 1);
    res.json({ message: 'Success', dataDeleted: deletedBook[0] });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

module.exports = { getBooks, getBooksById, createBook, updateBook, deleteBook };
