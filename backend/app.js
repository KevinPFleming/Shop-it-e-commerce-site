const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errors')

app.use(express.json());

// Import all Routes
const products = require('./routes/product');
const auth = require('./routes/auth');

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use(errorMiddleware);

module.exports = app;