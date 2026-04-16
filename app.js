require('dotenv').config();
const cors = require('cors');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const aliens = require('./routes/aliens');
const errorHandlerMiddleware = require('./middleware/error-handler.js');

const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

const allowedOrigins = ['https://editor.swagger.io'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);

// Body parser
app.use(express.json());

// routes
app.use('/api/v1/aliens', aliens);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

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
