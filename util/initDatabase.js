const mongoose = require('mongoose');

const MONGO_URL = "mongodb+srv://pp:pp@cluster0.0ra6t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
.connect(MONGO_URL)
.then(console.log("Connected to database"))
.catch((err) => console.log(err));

const codeforcesProblemsetUpdate = require('./codeforcesProblemsetUpdate');

codeforcesProblemsetUpdate();