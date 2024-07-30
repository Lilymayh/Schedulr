const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

const userRoutes = require('./src/routes/userRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const reminderRoutes = require('./src/routes/reminderRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');

//Middleware
app.use(express.json());
app.use(cookieParser());

app.use(session({
	secret: 'undercover_key',
  resave: false,
  saveUninitialized: true,
	cookie: {
    httpOnly: true, // Prevents client-side script from accessing cookies
    maxAge: 24 * 60 * 60 * 1000 // Cookie expiry time
  }
}));

app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/notifications', notificationRoutes);

module.exports = app;