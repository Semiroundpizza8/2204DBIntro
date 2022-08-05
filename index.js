const express = require('express');
const env = require("dotenv");

env.config();
const app = express();


const volleyball = require('volleyball');
app.use(volleyball);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

console.log("Hello!");

app.use('/api', require('./api'))
app.get('/', (req, res, next) => {
    res.send("App Running!")
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});