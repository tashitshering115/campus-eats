
const session = require('express-session');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Import MongoDB connection
const { connectMongo } = require('./config/mongo');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (CSS, client-side JS)
app.use(express.static(path.join(__dirname, 'public')));

// Form submission & JSON middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware (Lab 7)
app.use(session({
  secret: process.env.SESSION_SECRET || 'campus-eats-dev-secret',
  resave: false,
  saveUninitialized: false,
}));

// Make logged-in user session data available to all EJS templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Import Routers & Middleware
const { requireAuth, requireAdmin, requireSuperAdmin } = require('./middleware/auth');
const authRouter = require('./routes/auth');
const indexRoutes = require('./routes/index');

// Mount Routes
app.use('/', indexRoutes);
app.use('/', authRouter);

// Connect to MongoDB
connectMongo().catch(err => {
  console.error('MongoDB connection failed:', err);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Campus Eats running at http://localhost:${PORT}`);
});
