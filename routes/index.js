const router = require('express').Router();
const peopleRouter = require('./peopleRouter');
const booksRouter = require('./booksRouter');
const productsRouter = require('./productsRouter');
const jobRouter = require('./jobRouter');

router.use('/people', peopleRouter);
router.use('/books', booksRouter);
router.use('/products', productsRouter);
router.use('/jobs', jobRouter);

// Import data
const { data } = require('../data');

// Route to render the people view
router.get('/views/people', (req, res) => {
  res.render('people', { data });
});

module.exports = router;
