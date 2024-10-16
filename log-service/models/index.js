'use strict';

const mongoose = require('mongoose');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];

mongoose.connect(config.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = {
    LogCategory: require('./logcategory'),
    LogEntry: require('./logentry'),
    UserActivity: require('./useractivity')
};

module.exports = db;