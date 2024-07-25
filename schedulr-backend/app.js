const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes')
const profileRoutes = require('./src/routes/profileRoutes')

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', profileRoutes);

module.exports = app;