const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

mongoose
.connect(MONGO_URL)
.then(console.log("Connected to database"))
.catch((err) => console.log(err));

const codeforcesProblemsetUpdate = require('./codeforcesProblemsetUpdate');

codeforcesProblemsetUpdate();