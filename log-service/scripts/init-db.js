const mongoose = require('mongoose');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];

const LogCategory = require('../models/logcategory');
const LogEntry = require('../models/logentry');
const UserActivity = require('../models/useractivity');

async function initDB() {
    try {
        await mongoose.connect(config.uri);

        console.log('Connected to MongoDB');

        // Seed LogCategories
        const logCategories = [
            { name: 'INFO' },
            { name: 'WARNING' },
            { name: 'ERROR' }
        ];

        const insertedLogCategories = await LogCategory.insertMany(logCategories);
        console.log('LogCategories seeded:', insertedLogCategories);

        // Seed LogEntries
        const logEntries = [
            {
                timestamp: new Date(),
                message: 'System started',
                service: 'System',
                component: 'Core',
                context: { info: 'System initialization' },
                categoryId: insertedLogCategories[0]._id
            }
        ];

        const insertedLogEntries = await LogEntry.insertMany(logEntries);
        console.log('LogEntries seeded:', insertedLogEntries);

        // Seed UserActivities
        const userActivities = [
            {
                userId: 1,
                action: 'Login',
                timestamp: new Date(),
                context: { ip: '127.0.0.1' }
            }
        ];

        const insertedUserActivities = await UserActivity.insertMany(userActivities);
        console.log('UserActivities seeded:', insertedUserActivities);

        mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Error initializing database:', err);
        mongoose.disconnect();
    }
}

initDB();