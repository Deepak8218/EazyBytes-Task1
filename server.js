const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Initialize express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection (without deprecated options)


const mongoURI = 'mongodb+srv://darkweb8218:lfUiDalbYWJitb3d@cluster0.lou8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));


// mongoose.connect('mongodb://localhost:27017/portfolio')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.log('Error connecting to MongoDB:', err));



// Schema and Model for form data
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const FormData = mongoose.model('FormData', formSchema);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/api/submit-form', async (req, res) => {
  try {

    const form = new FormData(req.body);


    await form.save();


    res.status(200).json({ message: 'Data submitted successfully!' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Failed to submit data.' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});














