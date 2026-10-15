const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Registro de rutas principales (ej: /api/v1/loans)
// app.use('/api/v1', require('./routes'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API Control Labs - OK' });
});

module.exports = app;
