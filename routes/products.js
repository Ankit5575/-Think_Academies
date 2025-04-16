const express = require('express');
const router = express.Router();
const { dbOperations } = require('../db/database');
const { authenticateToken } = require('../middleware/auth');

// Get all products
router.get('/', (req, res, next) => {
  dbOperations.getAllProducts((err, products) => {
    if (err) {
      return next(err);
    }
    res.json(products);
  });
});

// Get single product by ID
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  dbOperations.getProductById(id, (err, product) => {
    if (err) {
      return next(err);
    }
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  });
});

// Create new product (protected route)
router.post('/', authenticateToken, (req, res, next) => {
  const { name, description, price, imageUrl } = req.body;

  // Validate required fields
  if (!name || !description || !price || !imageUrl) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate price is a number
  if (isNaN(parseFloat(price))) {
    return res.status(400).json({ error: 'Price must be a number' });
  }

  const product = {
    name,
    description,
    price: parseFloat(price),
    imageUrl
  };

  dbOperations.createProduct(product, (err, id) => {
    if (err) {
      return next(err);
    }
    res.status(201).json({ id, ...product });
  });
});

// Update product (protected route)
router.put('/:id', authenticateToken, (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  const { name, description, price, imageUrl } = req.body;

  // Validate required fields
  if (!name || !description || !price || !imageUrl) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate price is a number
  if (isNaN(parseFloat(price))) {
    return res.status(400).json({ error: 'Price must be a number' });
  }

  const product = {
    name,
    description,
    price: parseFloat(price),
    imageUrl
  };

  dbOperations.updateProduct(id, product, (err) => {
    if (err) {
      return next(err);
    }
    res.json({ id, ...product });
  });
});

// Delete product (protected route)
router.delete('/:id', authenticateToken, (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  dbOperations.deleteProduct(id, (err) => {
    if (err) {
      return next(err);
    }
    res.status(204).send();
  });
});

module.exports = router; 