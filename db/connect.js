/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const connectString = '';

mongoose
  .connect(connectString)
  .then(console.log('CONNECTED TO DB'))
  .catch((err) => console.log(err));
