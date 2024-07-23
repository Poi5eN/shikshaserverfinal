// // const mongoose = require('mongoose');

// // const feeStatus = new mongoose.Schema({
// //     schoolId: {
// //         type: String,
// //         required: true
// //     },
// //     studentId: {
// //         type: String,
// //         required: true
// //     },

// //     year: {
// //         type: String,
// //         required: true
// //     },
// //     dues:{
// //         type: Number
// //     },
// //     // feeStatus: {
// //     //     type: String,
// //     //     required: true
// //     // },
// //     feeHistory: [
// //         {
// //             date: {
// //                 type: Date,
// //                 required: true
// //             },
// //             status: {
// //                 type: String,
// //                 required: true
// //             },
// //             month: {
// //                 type: String,
// //                 required: true
// //             },
// //             paidAmount: {
// //                 type: String,
// //                 required: true
// //             }
// //         }
// //     ]
// // });

// // module.exports = mongoose.model("feeStatus", feeStatus);

// const mongoose = require('mongoose');

// const feeStatus = new mongoose.Schema({
//     schoolId: {
//         type: String,
//         required: true
//     },
//     admissionNumber: {
//         type: String,
//         required: true
//     },
//     year: {
//         type: String,
//         required: true
//     },
//     dues: {
//         type: Number
//     },
//     feeHistory: [
//         {
//             date: {
//                 type: Date,
//                 required: true
//             },
//             status: {
//                 type: String,
//                 required: true
//             },
//             month: {
//                 type: String,
//                 required: true
//             },
//             paidAmount: {
//                 type: String,
//                 required: true
//             },
//             feeReceiptNumber: {
//                 type: String,
//                 required: true
//             },
//             paymentMode: {  // Added paymentMode field
//                 type: String,
//                 required: true
//             }
//         }
//     ]
// });

// module.exports = mongoose.model("feeStatus", feeStatus);


const mongoose = require('mongoose');

const feeHistorySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    paidAmount: {
        type: Number,  // Changed from String to Number
        required: true
    },
    feeReceiptNumber: {
        type: String,
        required: true
    },
    paymentMode: {
        type: String,
        required: true
    }
});

const monthlyDuesSchema = new mongoose.Schema({
    month: {
        type: String,
        required: true
    },
    dueAmount: {
        type: Number,
        required: true
    }
});

const feeStatus = new mongoose.Schema({
    schoolId: {
        type: String,
        required: true
    },
    admissionNumber: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    dues: {
        type: Number,
        default: 0
    },
    feeHistory: [feeHistorySchema],
    monthlyDues: [monthlyDuesSchema]
});

module.exports = mongoose.model("feeStatus", feeStatus);



