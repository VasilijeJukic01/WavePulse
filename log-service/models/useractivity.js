const mongoose = require('mongoose');
const { Schema } = mongoose;

const userActivitySchema = new Schema({
  userId: {
    type: Number,
    required: true
  },
  action: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  context: {
    type: Object,
    validate: {
      validator: function (v) {
        return typeof v === 'object' && v !== null;
      },
      message: 'context must be a valid JSON object'
    }
  }
});

module.exports = mongoose.model('UserActivity', userActivitySchema);