
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const indexRoutes = require('./routes/indexRoutes.js');



const app = express();

const MONGO_URI = process.env.MONGO_URI;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Database connected!'))
    .catch(err => console.error('❌ Error connecting DB:', err));

// Rutas
app.use('/api', indexRoutes);

module.exports = app;