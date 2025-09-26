require('dotenv').config();

module.exports = {
    development: {
        uri: process.env.MONGO_URI
    },
    test: {
        uri: process.env.MONGO_URI
    },
    production: {
        uri: process.env.MONGO_URI
    }
};