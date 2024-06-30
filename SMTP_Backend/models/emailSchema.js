const mongoose = require('mongoose');

// Define the email schema
const emailSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  starred: {
    type: Boolean,
    default: false,
  },
  important: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  viewed:{
    type:Boolean,
    default:false,
  }
});

// Create the Email model using the schema
const Email = mongoose.model('Email', emailSchema);

// Export the Email model
module.exports = Email;
