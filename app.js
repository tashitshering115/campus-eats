const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (CSS, client-side JS)
app.use(express.static(path.join(__dirname, 'public')));

// Form submission middleware (Part M1)
app.use(express.urlencoded({ extended: true }));

// JSON parsing middleware (Lab 5)
app.use(express.json());

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// API Routes (Lab 5)
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Campus Eats running at http://localhost:${PORT}`);
});
