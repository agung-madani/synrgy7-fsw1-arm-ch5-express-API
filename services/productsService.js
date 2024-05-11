// services/productsService.js
const { dataProducts } = require('../dataProducts.js');

const getProducts = (req, res) => {
  res.json({ message: 'Success', data: dataProducts });
};

const getProductById = (req, res) => {
  const { id } = req.params;
  const product = dataProducts.find(p => p.id === parseInt(id));
  if (product) {
    res.json({ message: 'Success', data: product });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

const createProduct = (req, res) => {
  const { id, name, brand, price } = req.body;
  const newProduct = { id, name, brand, price };
  dataProducts.push(newProduct);
  res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, brand, price } = req.body;
  const productIndex = dataProducts.findIndex(p => p.id === parseInt(id));
  if (productIndex !== -1) {
    dataProducts[productIndex] = { ...dataProducts[productIndex], name, brand, price };
    res.json(dataProducts[productIndex]); // Return the updated product object
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const productIndex = dataProducts.findIndex(p => p.id === parseInt(id));
  if (productIndex !== -1) {
    const deletedProduct = dataProducts.splice(productIndex, 1);
    res.json({ message: 'Success', dataDeleted: deletedProduct[0] });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
