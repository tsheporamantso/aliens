const express = require('express');
const aliens = require('./routes/aliens');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const cors = require('cors');

const app = express();

const allowedOrigins = ['https://editor.swagger.io'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);

// Body parser
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.status(200).send('<h1>Aliens Management 👽</h1>');
});

// routes
app.use('/api/v1/aliens', aliens);

// middleware
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
