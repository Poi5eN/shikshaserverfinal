const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  schoolId: {
    type: String,
    required: true
  },
  className: {
    type: String,
    required: true
  },
  section: {
    type: [String],
    default: []
  },
  subject: {
    type: [String],
    default: []
  },
  primary: {
    type: Boolean,
    default: false
  }
})
// Check if the model already exists to avoid OverwriteModelError
module.exports = mongoose.models.Class || mongoose.model('Class', classSchema);
