const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const reminderRoutes = require('./src/routes/reminderRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');

//parse JSON
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/notifications', notificationRoutes);

module.exports = app;