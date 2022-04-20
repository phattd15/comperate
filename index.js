const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
.connect(process.env.MONGO_URL)
.then(console.log("Connected to database"))
.catch((err) => console.log(err));

const authRoute = require('./routes/auth');
const problemsRoute = require('./routes/problems');
const usersRoute = require('./routes/users');

app.use('/api/auth/', authRoute);
app.use('/api/problems/', problemsRoute);
app.use('/api/users/', usersRoute);

app.use('/', (req, res) => {
  res.status(200).json("Probrate's backend")
});

app.listen(PORT, () => {
  console.log('BE running');
});