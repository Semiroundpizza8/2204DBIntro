const jwt = require("jsonwebtoken");
// Reach into env file so secret isn't in your github
const env = require("dotenv")
env.config();
const { SECRET } = process.env;

const user = {
    name: "Ben",
    email: "Ben@Ben.com",
    password: "password"
}

// To create a token...
const token = jwt.sign(user, SECRET);
console.log({ token });

// To read a token...
const decryptedInfo = jwt.verify(token, SECRET);
console.log({ decryptedInfo })