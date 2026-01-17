import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// Dummy data (nollautuu aina kun sovelluksen käynnistää uudellen)
const items = [{ "id": 1, "name": "Omena" },
               { "id": 2, "name": "Banaani" },
               { "id": 3, "name": "Mansikka" }];

//parsitaan json data pyynnnostä ja lisää request objekti
app.use(express.json());

// API root
app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get item based on id
app.get('/items/:id', (req, res) => {
  console.log('get item with id:', req.params.id);
  const itemFound = items.find(item => item.id == req.params.id);
  if (itemFound) {
    return res.json(itemFound);
  } else {
    return res.status(404).json({message: 'Item not found'});
  }
});

// PUT Route for items
app.put('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(item => item.id == req.params.id);
  if (itemIndex !== -1) {
    const newId = items[itemIndex].id;
    items[itemIndex] = { ...req.body, id: newId };
    res.json({message: 'Item updated'});
  } else {
    res.status(404).json({message: 'Item not found'});
  }
});

// DELETE Route for items
app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(item => item.id == req.params.id);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.json({message: 'Item deleted'});
  } else {
    res.status(404).json({message: 'Item not found'});
  }
});


// Add a new item
app.post('/items', (req, res) => {
    // console.log('add item request body:', req.body);
    // Lisätty id listaan lisättävällä objektille
    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    const newItem = { ...req.body, id: newId };
    items.push(newItem);
    res.status(201).json({message: 'Item added'});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});