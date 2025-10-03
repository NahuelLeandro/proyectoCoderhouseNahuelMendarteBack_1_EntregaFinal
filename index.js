const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./src/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middlewares
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Database connected!'))
  .catch(err => console.error('❌ Error connecting DB:', err));

// Rutas
app.use('/api', userRouter);

// Servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});