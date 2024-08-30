const express = require('express');
const aliens = require('./routes/aliens');

const app = express();

// Middleware
app.use(express.json());

app.use('/api/v1/aliens', aliens);

const port = process.env.PORT || 3000;

app.listen(port, console.log(`Server is listening on port ${port} `));
