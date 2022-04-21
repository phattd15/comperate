const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authTk = require('./util/authTk');

const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cors());

const options = {
  autoIndex: true
};

mongoose
.connect(process.env.MONGO_URL, options)
.then(console.log("Connected to database"))
.catch((err) => console.log(err));

const authRoute = require('./routes/auth');
const problemsRoute = require('./routes/problems');
const usersRoute = require('./routes/users');

app.use('/api/auth/', authRoute);
app.use('/api/problems/', problemsRoute);
app.use('/api/users/', usersRoute);

app.use('/', (req, res) => {
  res.json({
    success: true,
    message: "Probrate's backend is alive for now"
  })
});

app.listen(PORT, () => {
  console.log('BE running on', PORT);
});