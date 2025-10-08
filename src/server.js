
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const indexRoutes = require('./routes/indexRoutes.js');



const app = express();

const MONGO_URI = process.env.MONGO_URI;
console.log("----->", MONGO_URI)
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔍 Logger de requests 
app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.url}`);
    next();
});



// Conexión a MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Database connected!'))
    .catch(err => console.error('❌ Error connecting DB:', err));

// Rutas
app.use('/api', indexRoutes);


// Ruta base de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente 🚀');
});
app.use((req, res) => {
    console.log("❌ Ruta no encontrada:", req.method, req.url);
    res.status(404).send("Ruta no encontrada");
});


module.exports = app;