const mongoose = require('mongoose');
const { Schema } = mongoose;

const logCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('LogCategory', logCategorySchema);