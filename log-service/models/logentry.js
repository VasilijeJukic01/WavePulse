const mongoose = require('mongoose');
const { Schema } = mongoose;

const logEntrySchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  service: {
    type: String,
    required: true,
    trim: true
  },
  component: {
    type: String,
    required: true,
    trim: true
  },
  context: {
    type: Object,
    validate: {
      validator: function (v) {
        return typeof v === 'object' && v !== null;
      },
      message: 'context must be a valid JSON object'
    }
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LogCategory'
  }
});

module.exports = mongoose.model('LogEntry', logEntrySchema);