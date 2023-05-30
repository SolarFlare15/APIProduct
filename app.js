const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json());

//fetch("https://api.products.stage")

const products = [
    {
      "id": 1,
      "name": "Fjallraven - Foldsack No. 1 Backpack",
      "category": "men's clothing",
      "price": 109.95,
    },
  ];
  

//endpoint de la page titre

app.get('/', (req, res) => {
    return res.send('<html><head><title>Page Title</title></head><body>Voici la page principale</body></html>');
  });  

// api/product diff /api/product
app.get("/api/product", (req, res) => { //get request
    return res.json(products);
  });

  // Endpoint to get product by id
app.get('/api/product/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  return res.json(product);
});

// Endpoint to create a new product
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

//Endpoint to update a product
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

// Endpoint to delete a product
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
  return console.log(`le serveur est lancé sur le port: ${PORT}`)
})