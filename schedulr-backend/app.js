const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const reminderRoutes = require('./src/routes/reminderRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', profileRoutes);
app.use('/api', reminderRoutes);
app.use('/api', notificationRoutes);

module.exports = app;