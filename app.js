require('dotenv').config();
const cors = require('cors');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const aliens = require('./routes/aliens');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/userRoutes');
const errorHandlerMiddleware = require('./middleware/error-handler');
const { authenticateUser } = require('./middleware/authentication');

const swaggerDocument = YAML.load('./swagger.yaml');
const limiter = require('./middleware/rate-limiter');

const app = express();

const allowedOrigins = ['https://editor.swagger.io', 'http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);

// Body parser
app.use(express.json());

app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWT_SECRET));

// extra security
app.use(limiter);
app.use(helmet.default());

// routes
app.use('/api/v1/aliens', authenticateUser, aliens);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

// swagger doc
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
