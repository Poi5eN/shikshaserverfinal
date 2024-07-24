const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    schoolId : {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    section: [String],
    subject: [String]
});

module.exports = mongoose.model('Class', classSchema);
