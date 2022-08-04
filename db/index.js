module.exports = {
    client: require('./client'),
    ...require('./puppies'),
    ...require('./toys'),
    ...require('./tricks'),
    ...require('./puppies_tricks'),
}