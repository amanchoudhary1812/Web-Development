const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Declare path once

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/student_crud', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String,
});

const Student = mongoose.model('Student', studentSchema);

// Routes

// Read all students
app.get('/', async (req, res) => {
  const students = await Student.find();
  res.render('index', { students });
});

// Create student
app.post('/students', async (req, res) => {
  const { name, age, course } = req.body;
  const student = new Student({ name, age, course });
  await student.save();
  res.redirect('/');
});

// Edit student
app.get('/students/edit/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render('edit', { student });
});

// Update student
app.post('/students/edit/:id', async (req, res) => {
  const { name, age, course } = req.body;
  await Student.findByIdAndUpdate(req.params.id, { name, age, course });
  res.redirect('/');
});

// Delete student
app.get('/students/delete/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Route to show the Add Student form
app.get('/add', (req, res) => {
    res.render('add');  // Renders the add.ejs view
  });

  
  // Route to handle creating a new student
app.post('/students', async (req, res) => {
    const { name, age, course } = req.body;
    const student = new Student({ name, age, course });
    await student.save();
    res.redirect('/');  // Redirect back to the home page (list of students)
  });