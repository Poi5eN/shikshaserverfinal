// const FeeStatus = require("../models/feeStatus");
// const NewStudentModel = require("../models/newStudentModel");

// // Utility function to generate unique fee receipt number
// function generateUniqueFeeReceiptNumber() {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let result = '';
//     for (let i = 0; i < 5; i++) {
//         result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
// }

// exports.createOrUpdateFeePayment = async (req, res) => {
//     try {
//         const { admissionNumber, feeHistory, dues } = req.body;

//         const existingFeePayment = await FeeStatus.findOne({
//             schoolId: req.user.schoolId,
//             admissionNumber,
//             year: 2024,
//         });

//         // Generate unique fee receipt numbers for each fee history entry
//         feeHistory.forEach(entry => {
//             entry.feeReceiptNumber = generateUniqueFeeReceiptNumber();
//         });

//         if (existingFeePayment) {
//             // Update dues for each month based on new payments
//             feeHistory.forEach(entry => {
//                 existingFeePayment.dues = dues; // Adjust dues calculation based on your logic
//                 existingFeePayment.feeHistory.push(...feeHistory);
//             });
//             const updatedFeePayment = await existingFeePayment.save();
//             res.status(201).json({
//                 success: true,
//                 message: "Fee Status is Saved Successfully",
//                 data: updatedFeePayment
//             });
//         } else {
//             const newFeePayment = new FeeStatus({
//                 schoolId: req.user.schoolId,
//                 year: 2024,
//                 ...req.body
//             });
//             feeHistory.forEach(entry => {
//                 newFeePayment.dues = dues; // Adjust dues calculation based on your logic
//             });
//             const savedFeePayment = await newFeePayment.save();
//             res.status(201).json({
//                 success: true,
//                 message: "Fee Status is Saved Successfully",
//                 data: savedFeePayment
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Fee Status is not created Successfully",
//             error: error.message
//         });
//     }
// };



// exports.getFeeStatus = async (req, res) => {
//     try {
//         const { admissionNumber } = req.query;

//         let filter = {
//             ...(admissionNumber ? { admissionNumber: admissionNumber } : {}),
//         };

//         const feesData = await FeeStatus.find({ schoolId: req.user.schoolId, ...filter });

//         res.status(200).json({
//             success: true,
//             message: "Fees Data Successfully Get",
//             data: feesData
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Fees Details is not get Successfully",
//             error: error.message
//         });
//     }
// };


// exports.feeIncomeMonths = async (req, res) => {
//     try {

//         const feesData = await FeeStatus.find({ schoolId: req.user.schoolId });

//         let arr = new Array(12);

//         for (let i=0; i<12; i++) arr[i] = 0;

//         console.log("feesData.length", feesData.length)

//         for (let j=0; j<feesData.length; j++) {

//             console.log("feesData[j].feeHistory.length", feesData[j].feeHistory.length)
//             for (let k=0; k<feesData[j].feeHistory.length; k++) {

//                 console.log("feesData[j].feeHistory[k].paidAmount", feesData[j].feeHistory[k].paidAmount);
//                 arr[k] += Number(feesData[j].feeHistory[k].paidAmount);
//             }

//         }

//         console.log(arr);

//         res.status(200).json({
//             success: true,
//             message: "Fees Data Successfully Get",
//             data: arr
//         })

//     }
//     catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Fee Income According to month is not get due to error",
//             error: error.message
//         })
//     }
// }


// exports.getFeeHistory = async (req, res) => {
//     try {
//         const { admissionNumber } = req.query;

//         let filter = {
//             schoolId: req.user.schoolId,
//             ...(admissionNumber ? { admissionNumber: admissionNumber } : {})
//         };

//         const feeStatusData = await FeeStatus.find(filter).exec();

//         let feeHistory = [];
//         for (const feeStatus of feeStatusData) {
//             const studentData = await NewStudentModel.findOne({ admissionNumber: feeStatus.admissionNumber }, 'fullName class admissionNumber').exec();

//             // Check if studentData exists before using it
//             if (studentData) {
//                 let cumulativeDues = 0;
//                 feeStatus.feeHistory.forEach(history => {
//                     cumulativeDues += history.paidAmount;
//                     feeHistory.push({
//                         admissionNumber: studentData.admissionNumber,
//                         studentName: studentData.fullName,
//                         studentClass: studentData.class,
//                         feeReceiptNumber: history.feeReceiptNumber,
//                         paymentMode: history.paymentMode,
//                         dues: feeStatus.dues - cumulativeDues, // Calculate dues based on cumulative payments
//                         ...history._doc
//                     });
//                 });
//             } else {
//                 console.error(`Student with admissionNumber ${feeStatus.admissionNumber} not found`);
//             }
//         }

//         res.status(200).json({
//             success: true,
//             message: "Fee history retrieved successfully",
//             data: feeHistory,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to retrieve fee history",
//             error: error.message,
//         });
//     }
// };


const FeeStatus = require("../models/feeStatus");
const NewStudentModel = require("../models/newStudentModel");

// Utility function to generate unique fee receipt number
function generateUniqueFeeReceiptNumber() {
    const characters = 'ABC0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Placeholder function to fetch the monthly fee for a class
async function getMonthlyFeeForClass(className) {
    // Implement the logic to fetch the monthly fee for the class, e.g., from another API
    // Here, we use a fixed value for demonstration purposes
    const fees = {
        "classA": 1000,
        "classB": 1200,
        // Add other classes as needed
    };
    return fees[className] || 1000; // Default to 1000 if class not found
}

exports.createOrUpdateFeePayment = async (req, res) => {
    try {
        const { admissionNumber, feeHistory, className } = req.body;
        const schoolId = req.user.schoolId;
        const year = new Date().getFullYear(); // Get the current year dynamically

        // Fetch the monthly fee for the class
        const monthlyFee = await getMonthlyFeeForClass(className);

        const existingFeePayment = await FeeStatus.findOne({
            schoolId,
            admissionNumber,
            year,
        });

        // Check for duplicate months in fee history
        if (existingFeePayment) {
            const existingMonths = existingFeePayment.feeHistory.map(entry => entry.month);
            const duplicateMonths = feeHistory.filter(entry => existingMonths.includes(entry.month));

            if (duplicateMonths.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: `Fee for month(s) ${duplicateMonths.map(entry => entry.month).join(', ')} already exists for the year ${year}`,
                });
            }
        }

        // Generate unique fee receipt numbers for each fee history entry
        feeHistory.forEach(entry => {
            entry.feeReceiptNumber = generateUniqueFeeReceiptNumber();
        });

        if (existingFeePayment) {
            // Add the new fee history entries and update monthly dues
            feeHistory.forEach(entry => {
                existingFeePayment.feeHistory.push(entry);
                let monthlyDue = existingFeePayment.monthlyDues.find(due => due.month === entry.month);
                if (monthlyDue) {
                    monthlyDue.dueAmount -= entry.paidAmount;
                } else {
                    existingFeePayment.monthlyDues.push({
                        month: entry.month,
                        dueAmount: monthlyFee - entry.paidAmount
                    });
                }
            });

            // Ensure monthly dues are correct for all months
            let monthlyDuesMap = {};
            existingFeePayment.feeHistory.forEach(entry => {
                if (!monthlyDuesMap[entry.month]) {
                    monthlyDuesMap[entry.month] = monthlyFee;
                }
                monthlyDuesMap[entry.month] -= entry.paidAmount;
            });

            existingFeePayment.monthlyDues = Object.keys(monthlyDuesMap).map(month => ({
                month: month,
                dueAmount: monthlyDuesMap[month]
            }));

            // Recalculate the total dues
            existingFeePayment.dues = existingFeePayment.monthlyDues.reduce((acc, due) => acc + due.dueAmount, 0);

            const updatedFeePayment = await existingFeePayment.save();
            res.status(201).json({
                success: true,
                message: "Fee Status is Saved Successfully",
                data: updatedFeePayment
            });
        } else {
            const newFeePayment = new FeeStatus({
                schoolId,
                admissionNumber,
                year,
                dues: 0,
                feeHistory,
                monthlyDues: []
            });

            // Calculate the initial dues based on the fee history
            let monthlyDuesMap = {};
            feeHistory.forEach(entry => {
                if (!monthlyDuesMap[entry.month]) {
                    monthlyDuesMap[entry.month] = monthlyFee;
                }
                monthlyDuesMap[entry.month] -= entry.paidAmount;
            });

            newFeePayment.monthlyDues = Object.keys(monthlyDuesMap).map(month => ({
                month: month,
                dueAmount: monthlyDuesMap[month]
            }));

            // Calculate the total dues
            newFeePayment.dues = newFeePayment.monthlyDues.reduce((acc, due) => acc + due.dueAmount, 0);

            const savedFeePayment = await newFeePayment.save();
            res.status(201).json({
                success: true,
                message: "Fee Status is Saved Successfully",
                data: savedFeePayment
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Fee Status is not created Successfully",
            error: error.message
        });
    }
};


exports.getFeeStatus = async (req, res) => {
    try {
        const { admissionNumber } = req.query;

        let filter = {
            ...(admissionNumber ? { admissionNumber: admissionNumber } : {}),
        };

        const feesData = await FeeStatus.find({ schoolId: req.user.schoolId, ...filter });

        res.status(200).json({
            success: true,
            message: "Fees Data Successfully Get",
            data: feesData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Fees Details is not get Successfully",
            error: error.message
        });
    }
};


exports.feeIncomeMonths = async (req, res) => {
    try {

        const feesData = await FeeStatus.find({ schoolId: req.user.schoolId });

        let arr = new Array(12);

        for (let i=0; i<12; i++) arr[i] = 0;

        console.log("feesData.length", feesData.length)

        for (let j=0; j<feesData.length; j++) {

            console.log("feesData[j].feeHistory.length", feesData[j].feeHistory.length)
            for (let k=0; k<feesData[j].feeHistory.length; k++) {

                console.log("feesData[j].feeHistory[k].paidAmount", feesData[j].feeHistory[k].paidAmount);
                arr[k] += Number(feesData[j].feeHistory[k].paidAmount);
            }

        }

        console.log(arr);

        res.status(200).json({
            success: true,
            message: "Fees Data Successfully Get",
            data: arr
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Fee Income According to month is not get due to error",
            error: error.message
        })
    }
}


exports.getFeeHistory = async (req, res) => {
    try {
        const { admissionNumber } = req.query;

        let filter = {
            schoolId: req.user.schoolId,
            ...(admissionNumber ? { admissionNumber: admissionNumber } : {})
        };

        const feeStatusData = await FeeStatus.find(filter).exec();

        let feeHistory = [];
        for (const feeStatus of feeStatusData) {
            const studentData = await NewStudentModel.findOne({ admissionNumber: feeStatus.admissionNumber }, 'fullName class admissionNumber').exec();

            // Check if studentData exists before using it
            if (studentData) {
                feeStatus.feeHistory.forEach(history => {
                    const monthDue = feeStatus.monthlyDues.find(md => md.month === history.month);
                    feeHistory.push({
                        admissionNumber: studentData.admissionNumber,
                        studentName: studentData.fullName,
                        studentClass: studentData.class,
                        feeReceiptNumber: history.feeReceiptNumber,
                        paymentMode: history.paymentMode,
                        dues: monthDue ? monthDue.dueAmount : 0, // Get dues for the specific month
                        ...history._doc
                    });
                });
            } else {
                console.error(`Student with admissionNumber ${feeStatus.admissionNumber} not found`);
            }
        }

        res.status(200).json({
            success: true,
            message: "Fee history retrieved successfully",
            data: feeHistory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve fee history",
            error: error.message,
        });
    }
};



// // exports.createExam = async (req, res) => {
// //     try {

// //         const {studentId, year, feeHistory} = req.body;

// //         // if (!examName || !className || !section || !examInfo) {
// //         //     return res.status(404).json({
// //         //         success: false,
// //         //         message: "Record Not Found Please Fill All Required Details"
// //         //     })
// //         // }

// //         // const existExam = await ExamModel.findOne({
// //         //     "schoolId": req.user.schoolId,
// //         //     "className": req.user.classTeacher,
// //         //     "section": req.user.section
// //         // })

// //         // if (existExam) {
// //         //     return res.status(400).json({
// //         //         success: false,
// //         //         message: "Exam of that class and section is already created"
// //         //     })
// //         // }

// //         const feesData = await FeeStatus.create({
// //             schoolId: req.user.schoolId,
// //             studentId,
// //             year
// //         })

// //         res.status(201).json({
// //             success: true,
// //             message: "Exam is Successfully Created",
// //             examData
// //         })

// //     }
// //     catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Exam is not created Successfully",
// //             error: error.message
// //         })
// //     }
// // }

// // exports.deleteExam = async (req, res) => {
// //     try {

// //         const {examId} = req.params;

// //         const existExam = await ExamModel.findById(examId);

// //         if (!existExam) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "Exam Data not found"
// //             })
// //         }

// //         const deletedExam = await existExam.deleteOne();

// //         res.status(200).json({
// //             success: true,
// //             message: "Deleted Exam Info is Successfully",
// //             deletedExam
// //         })

// //     } 
// //     catch (error) {

// //         res.status(500).json({
// //             success: false,
// //             message: "Delete info of Exam not done successfully due to error",
// //             error: error.message
// //         })

// //     }
// // }

// // exports.updateExam = async (req, res) => {
// //     try {

// //         const {...examFields} = req.body;

// //         const existExamData = await ExamModel.findOne({
// //             schoolId: req.user.schoolId,
// //             className: examFields.className,
// //             section: examFields.section
// //         })

// //         if (!existExamData) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: "Exam Details is not found"
// //             })
// //         }

// //         for (const key in examFields) {

// //             if (key === "examName" || key === "examInfo")
// //                 existExamData[key] = examFields[key]
// //         }

// //         const updatedExamData = await existExamData.save();

// //         res.status(200).json({
// //             success: true,
// //             message: "Exam Details is successfully updated",
// //             updatedExamData
// //         })

// //     }
// //     catch (error) {

// //         res.status(500).json({
// //             success: false,
// //             message: "Update Details of Exam is not successfully",
// //             error: error.message
// //         })

// //     }
// // }
