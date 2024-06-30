const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
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
  timestamp: {
    type: Date,
    default: Date.now,
  },
  viewed:{
    type:Boolean,
    default:false,
  }
  
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
