const express = require('express');
const aliens = require('./routes/aliens');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');

const app = express();

// Middleware
app.use(express.json());

// routes
app.use('/api/v1/aliens', aliens);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port} `));
  } catch (error) {
    console.log(error);
  }
};

start();
