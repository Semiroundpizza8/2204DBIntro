const express = require('express');
const env = require("dotenv");

env.config();
const app = express();

const volleyball = require('volleyball');
app.use(volleyball);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Alternative to bodyParse: app.use(express.urlencoded());
// app.use((req, res, next) => {
//     const rawBody = req.rawBody // bookId=12345&author=Tan+Ah+Teck
//     const body = rawBody.split("&"); ['bookId=12345', 'author="Tan+Ah+Teck"'];
//     // Convert from array to object
//     req.body = body;
//     next();


// })

console.log("Hello!");

app.use('/api', require('./api'))
app.get('/', (req, res, next) => {
    res.send("App Running!")
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});