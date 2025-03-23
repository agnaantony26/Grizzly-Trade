const express = require('express');
const mongoose = require('mongoose');


const cors = require('cors');

const app = express();

app.use(cors());  // Enable CORS for all routes




// Enable CORS for all routes
app.use(cors());

// Your routes and other setup

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB 
mongoose.connect('mongodb://localhost:27017/grizz-marketplace', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB: ', error));

// Basic route to check if the server is working
app.get('/', (req, res) => {
  res.send('Grizzly Trade Backend is Running!');
});

// Set up the server to listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const Student = require('./models/Student');
const Item = require('./models/Item');

app.post('/api/students', async (req, res) => {
    try {
      const { ouID, name, email, age, university } = req.body;
  
      // Create a new student
      const newStudent = new Student({
        ouID, // Include OU ID
        name,
        email,
        age,
        university,
      });
  
      // Save to database
      await newStudent.save();
  
      res.status(201).json({ message: 'Student added successfully', student: newStudent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding student' });
    }
  });
  

  

  
// Route to add an item to the marketplace
app.post('/api/items', async (req, res) => {
  try {
    const { sellerId, itemName, description, price, category, condition } = req.body;

    // Create a new item listing
    const newItem = new Item({
      sellerId,
      itemName,
      description,
      price,
      category,
      condition,
    });

    // Save the item to the database
    await newItem.save();

    res.status(201).json({ message: 'Item listed successfully', item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error listing the item' });
  }
});

// Route to get all available items
app.get('/api/items', async (req, res) => {
    try {
      const items = await Item.find({ status: 'Available' }); // Only fetch available items
      res.status(200).json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching items' });
    }
  });

  // Route to get details of a specific item
app.get('/api/items/:itemId', async (req, res) => {
    try {
      const { itemId } = req.params;
      const item = await Item.findById(itemId).populate('sellerId', 'name email'); // Populate seller details
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching item details' });
    }
  });

  // Route to update an item's status to "Sold"
app.patch('/api/items/:itemId', async (req, res) => {
    try {
      const { itemId } = req.params;
      const updatedItem = await Item.findByIdAndUpdate(itemId, { status: 'Sold' }, { new: true });
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating item status' });
    }
  });

  