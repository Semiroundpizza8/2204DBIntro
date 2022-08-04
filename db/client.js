// Init the client
const { Client } = require("pg");
const client = new Client("postgres://localhost:5444/puppystore");

// Connect
client.connect();

// Export
module.exports = client;