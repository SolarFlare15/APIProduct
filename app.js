const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const products = [
  {
    "id": 1,
    "name": "Fjallraven - Foldsack No. 1 Backpack",
    "category": "men's clothing",
    "price": 109.95,
  },
  
  {
    "id": 2,
    "name": "ProductName",
    "category": "ProductCategory",
    "price": 105.12,
  },

  {
    "id": 3,
    "name": "TestName",
    "category": "TestCat",
    "price": 19.95,
  },
];

app.get('/', (req, res) => {
  return res.send('<html><head><title>Page Title</title></head><body>Voici la page principale</body></html>');
});

// Recherche des produits par nom ou catégorie
app.get('/api/product/search', (req, res) => {
  const { name, category } = req.query;

  let filteredProducts = products;

  if (name) {
    filteredProducts = filteredProducts.filter(p => p.name.includes(name));
  }

  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (filteredProducts.length === 0) {
    return res.status(404).json({ error: 'No products found' });
  }

  return res.json(filteredProducts);
});


// Pagination des résultats
app.get('/api/product', (req, res) => {
  const { limit = 10, offset = 0 } = req.query;

  const startIndex = parseInt(offset);
  const endIndex = startIndex + parseInt(limit);

  const paginatedProducts = products.slice(startIndex, endIndex);

  return res.json(paginatedProducts);
});

// Endpoint pour obtenir un produit par son id
app.get('/api/product/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.json(product);
});

// Endpoint pour créer un nouveau produit
app.post('/api/product', (req, res) => {
  const { id, name, category, price } = req.body;

  if (!id || !name || !category || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newProduct = {
    id: parseInt(id),
    name,
    category,
    price: parseFloat(price)
  };

  products.push(newProduct);

  return res.status(201).json(newProduct);
});

// Endpoint pour mettre à jour un produit
app.put('/api/product/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;

  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products[productIndex] = { ...products[productIndex], ...updatedProduct };

  return res.json(products[productIndex]);
});

// Endpoint pour supprimer un produit
app.delete('/api/product/:id', (req, res) => {
  const productId = parseInt(req.params.id);

  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products.splice(productIndex, 1);

  return res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur le port: ${PORT}`);
});
