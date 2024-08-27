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
//     dues:{
//         type: Number
//     },
//     // feeStatus: {
//     //     type: String,
//     //     required: true
//     // },
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
//             }
//         }
//     ]
// });

// module.exports = mongoose.model("feeStatus", feeStatus);

const mongoose = require('mongoose');

const regularFeeSchema = new mongoose.Schema({
    paidAmount: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    }
});

const additionalFeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    paidAmount: {
        type: Number,
        required: true
    }
});

const feeHistorySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    regularFees: [regularFeeSchema],
    additionalFees: [additionalFeeSchema],
    paymentMode: {
        type: String,
        required: true
    },
    transactionId: {
        type: String
    },
    previousDues: {
        type: Number,
        default: 0
    },
    remark: {
        type: String
    },
    totalAmountPaid: {
        type: Number,
        required: true
    },
    totalDues: {
        type: Number,
        required: true
    },
    feeReceiptNumber: {
        type: String,
        required: true
    }
});

const monthlyRegularDuesSchema = new mongoose.Schema({
    month: {
        type: String,
        required: true
    },
    dueAmount: {
        type: Number,
        required: true
    },
    paidAmount: {
        type: Number,
        required: true
    }
});

const monthlyAdditionalDuesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    dueAmount: {
        type: Number,
        required: true
    },
    paidAmount: {
        type: Number,
        required: true
    }
});

const feeStatusSchema = new mongoose.Schema({
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
    monthlyRegularDues: [monthlyRegularDuesSchema],
    monthlyAdditionalDues: [monthlyAdditionalDuesSchema],
    monthlyDues: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("FeeStatus", feeStatusSchema);




