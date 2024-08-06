const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
    schoolId: {
        type: String,
        required: true
    },
    "fullName": {
        type: String,
        required: [true, "Please Enter the Name of Student"]
    },
    "email": {
        type: String,
        required: [true, "Please Enter the Email Address"],
        unique: true
    },
    "password": {
        type: String,
        required: [true, "Please Enter the Password"],
        select: false
        // minLength: [8, "Minimum 8 character Required in Password"]
    },
    "dateOfBirth": {
        type: Date,
        // required: true,
        validate: {
            validator: function(value) {
                return value <= new Date()
            },
            message: "Date of birth cannot be in the future"
        }
    },
    motherName:{
        type: String
    },
    fatherName:{
        type: String
    },
    parentContact: {
        type: Number,
    },
    "role": {
        type: String,
        required: true,
        default: "student"
    },
    rollNo: {
        type: String,
        // required: true,
        // unique: true,
    },
    "parentId": {
        type: String,
    },
    "status":{
       type: String,
       required: true,
       default: "active"
    },
    "gender": {
        type: String,
        // required: true
    },
    "joiningDate": {
        type: String,
        required: true
    },
    "address": {
        type: String,
        // required: true
    },
    "contact": {
        type: Number,
        // required: true
    },
    "class": {
        type: String,
        required: true
    },
    "section": {
        type: String,
        required: true
    },
    "country": {
        type: String,
        // required: true,
    },
    "subject": [String],
    "image": {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    admissionNumber: {
        type: String,
        unique: true,
        required: true,
        match: /^[A-Z]{3}\d{3}$/
    },
    religion: {
        type: String
    },
    caste: {
        type: String
    },
    nationality: {
        type: String
    },
    pincode: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

studentSchema.index({ email: 1, schoolId: 1 }, { unique: true });

const NewStudentModel = new mongoose.model("NewStudentModel", studentSchema);

module.exports = NewStudentModel;
