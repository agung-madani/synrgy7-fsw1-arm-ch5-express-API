// routes/productsRouter.js
const router = require('express').Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../services/productsService.js');
const { idChecker } = require('../helper/peopleHelper.js');

router.get('/', getProducts);
router.get('/:id', idChecker, getProductById);
router.post('/', createProduct);
router.put('/:id', idChecker, updateProduct);
router.delete('/:id', idChecker, deleteProduct);

module.exports = router;
