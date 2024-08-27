// // const FeeStatus = require("../models/feeStatus");
// // const NewStudentModel = require("../models/newStudentModel");

// // // Utility function to generate unique fee receipt number
// // function generateUniqueFeeReceiptNumber() {
// //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
// //     let result = '';
// //     for (let i = 0; i < 5; i++) {
// //         result += characters.charAt(Math.floor(Math.random() * characters.length));
// //     }
// //     return result;
// // }

// // exports.createOrUpdateFeePayment = async (req, res) => {
// //     try {
// //         const { admissionNumber, feeHistory, dues } = req.body;

// //         const existingFeePayment = await FeeStatus.findOne({
// //             schoolId: req.user.schoolId,
// //             admissionNumber,
// //             year: 2024,
// //         });

// //         // Generate unique fee receipt numbers for each fee history entry
// //         feeHistory.forEach(entry => {
// //             entry.feeReceiptNumber = generateUniqueFeeReceiptNumber();
// //         });

// //         if (existingFeePayment) {
// //             // Update dues for each month based on new payments
// //             feeHistory.forEach(entry => {
// //                 existingFeePayment.dues = dues; // Adjust dues calculation based on your logic
// //                 existingFeePayment.feeHistory.push(...feeHistory);
// //             });
// //             const updatedFeePayment = await existingFeePayment.save();
// //             res.status(201).json({
// //                 success: true,
// //                 message: "Fee Status is Saved Successfully",
// //                 data: updatedFeePayment
// //             });
// //         } else {
// //             const newFeePayment = new FeeStatus({
// //                 schoolId: req.user.schoolId,
// //                 year: 2024,
// //                 ...req.body
// //             });
// //             feeHistory.forEach(entry => {
// //                 newFeePayment.dues = dues; // Adjust dues calculation based on your logic
// //             });
// //             const savedFeePayment = await newFeePayment.save();
// //             res.status(201).json({
// //                 success: true,
// //                 message: "Fee Status is Saved Successfully",
// //                 data: savedFeePayment
// //             });
// //         }
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Fee Status is not created Successfully",
// //             error: error.message
// //         });
// //     }
// // };



// // exports.getFeeStatus = async (req, res) => {
// //     try {
// //         const { admissionNumber } = req.query;

// //         let filter = {
// //             ...(admissionNumber ? { admissionNumber: admissionNumber } : {}),
// //         };

// //         const feesData = await FeeStatus.find({ schoolId: req.user.schoolId, ...filter });

// //         res.status(200).json({
// //             success: true,
// //             message: "Fees Data Successfully Get",
// //             data: feesData
// //         });

// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Fees Details is not get Successfully",
// //             error: error.message
// //         });
// //     }
// // };


// // exports.feeIncomeMonths = async (req, res) => {
// //     try {

// //         const feesData = await FeeStatus.find({ schoolId: req.user.schoolId });

// //         let arr = new Array(12);

// //         for (let i=0; i<12; i++) arr[i] = 0;

// //         console.log("feesData.length", feesData.length)

// //         for (let j=0; j<feesData.length; j++) {

// //             console.log("feesData[j].feeHistory.length", feesData[j].feeHistory.length)
// //             for (let k=0; k<feesData[j].feeHistory.length; k++) {

// //                 console.log("feesData[j].feeHistory[k].paidAmount", feesData[j].feeHistory[k].paidAmount);
// //                 arr[k] += Number(feesData[j].feeHistory[k].paidAmount);
// //             }

// //         }

// //         console.log(arr);

// //         res.status(200).json({
// //             success: true,
// //             message: "Fees Data Successfully Get",
// //             data: arr
// //         })

// //     }
// //     catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Fee Income According to month is not get due to error",
// //             error: error.message
// //         })
// //     }
// // }


// // exports.getFeeHistory = async (req, res) => {
// //     try {
// //         const { admissionNumber } = req.query;

// //         let filter = {
// //             schoolId: req.user.schoolId,
// //             ...(admissionNumber ? { admissionNumber: admissionNumber } : {})
// //         };

// //         const feeStatusData = await FeeStatus.find(filter).exec();

// //         let feeHistory = [];
// //         for (const feeStatus of feeStatusData) {
// //             const studentData = await NewStudentModel.findOne({ admissionNumber: feeStatus.admissionNumber }, 'fullName class admissionNumber').exec();

// //             // Check if studentData exists before using it
// //             if (studentData) {
// //                 let cumulativeDues = 0;
// //                 feeStatus.feeHistory.forEach(history => {
// //                     cumulativeDues += history.paidAmount;
// //                     feeHistory.push({
// //                         admissionNumber: studentData.admissionNumber,
// //                         studentName: studentData.fullName,
// //                         studentClass: studentData.class,
// //                         feeReceiptNumber: history.feeReceiptNumber,
// //                         paymentMode: history.paymentMode,
// //                         dues: feeStatus.dues - cumulativeDues, // Calculate dues based on cumulative payments
// //                         ...history._doc
// //                     });
// //                 });
// //             } else {
// //                 console.error(`Student with admissionNumber ${feeStatus.admissionNumber} not found`);
// //             }
// //         }

// //         res.status(200).json({
// //             success: true,
// //             message: "Fee history retrieved successfully",
// //             data: feeHistory,
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Failed to retrieve fee history",
// //             error: error.message,
// //         });
// //     }
// // };


// // const FeeStatus = require("../models/feeStatus");
// // const NewStudentModel = require("../models/newStudentModel");
// // const FeeStructure = require("../models/feeStructureModel");

// // // Utility function to generate unique fee receipt number
// // function generateUniqueFeeReceiptNumber() {
// //     const characters = 'ABC0123456789';
// //     let result = '';
// //     for (let i = 0; i < 5; i++) {
// //         result += characters.charAt(Math.floor(Math.random() * characters.length));
// //     }
// //     return result;
// // }

// // // Placeholder function to fetch the monthly fee for a class
// // async function getMonthlyFeeForClass(schoolId, className) {
// //     try {
// //         const feeStructure = await FeeStructure.findOne({
// //             schoolId: schoolId,
// //             className: className,
// //             additional: false // Assuming 'additional' field distinguishes monthly fees from other fees
// //         });

// //         if (!feeStructure) {
// //             throw new Error(`Fee structure for class ${className} not found`);
// //         }

// //         return feeStructure.amount;
// //     } catch (error) {
// //         throw new Error(`Failed to fetch monthly fee for class ${className}: ${error.message}`);
// //     }
// // }

// // exports.createOrUpdateFeePayment = async (req, res) => {
// //     try {
// //         const { admissionNumber, feeHistory, className } = req.body;
// //         const schoolId = req.user.schoolId;
// //         const year = new Date().getFullYear(); // Get the current year dynamically

// //         // Fetch the monthly fee for the class
// //         const monthlyFee = await getMonthlyFeeForClass(className);

// //         const existingFeePayment = await FeeStatus.findOne({
// //             schoolId,
// //             admissionNumber,
// //             year,
// //         });

// //         // Check for duplicate months in fee history
// //         if (existingFeePayment) {
// //             const existingMonths = existingFeePayment.feeHistory.map(entry => entry.month);
// //             const duplicateMonths = feeHistory.filter(entry => existingMonths.includes(entry.month));

// //             if (duplicateMonths.length > 0) {
// //                 return res.status(400).json({
// //                     success: false,
// //                     message: `Fee for month(s) ${duplicateMonths.map(entry => entry.month).join(', ')} already exists for the year ${year}`,
// //                 });
// //             }
// //         }

// //         // Generate unique fee receipt numbers for each fee history entry
// //         feeHistory.forEach(entry => {
// //             entry.feeReceiptNumber = generateUniqueFeeReceiptNumber();
// //         });

// //         if (existingFeePayment) {
// //             // Add the new fee history entries and update monthly dues
// //             feeHistory.forEach(entry => {
// //                 existingFeePayment.feeHistory.push(entry);
// //                 let monthlyDue = existingFeePayment.monthlyDues.find(due => due.month === entry.month);
// //                 if (monthlyDue) {
// //                     monthlyDue.dueAmount -= entry.paidAmount;
// //                 } else {
// //                     existingFeePayment.monthlyDues.push({
// //                         month: entry.month,
// //                         dueAmount: monthlyFee - entry.paidAmount
// //                     });
// //                 }
// //             });

// //             // Ensure monthly dues are correct for all months
// //             let monthlyDuesMap = {};
// //             existingFeePayment.feeHistory.forEach(entry => {
// //                 if (!monthlyDuesMap[entry.month]) {
// //                     monthlyDuesMap[entry.month] = monthlyFee;
// //                 }
// //                 monthlyDuesMap[entry.month] -= entry.paidAmount;
// //             });

// //             existingFeePayment.monthlyDues = Object.keys(monthlyDuesMap).map(month => ({
// //                 month: month,
// //                 dueAmount: monthlyDuesMap[month]
// //             }));

// //             // Recalculate the total dues
// //             existingFeePayment.dues = existingFeePayment.monthlyDues.reduce((acc, due) => acc + due.dueAmount, 0);

// //             const updatedFeePayment = await existingFeePayment.save();
// //             res.status(201).json({
// //                 success: true,
// //                 message: "Fee Status is Saved Successfully",
// //                 data: updatedFeePayment
// //             });
// //         } else {
// //             const newFeePayment = new FeeStatus({
// //                 schoolId,
// //                 admissionNumber,
// //                 year,
// //                 dues: 0,
// //                 feeHistory,
// //                 monthlyDues: []
// //             });

// //             // Calculate the initial dues based on the fee history
// //             let monthlyDuesMap = {};
// //             feeHistory.forEach(entry => {
// //                 if (!monthlyDuesMap[entry.month]) {
// //                     monthlyDuesMap[entry.month] = monthlyFee;
// //                 }
// //                 monthlyDuesMap[entry.month] -= entry.paidAmount;
// //             });

// //             newFeePayment.monthlyDues = Object.keys(monthlyDuesMap).map(month => ({
// //                 month: month,
// //                 dueAmount: monthlyDuesMap[month]
// //             }));

// //             // Calculate the total dues
// //             newFeePayment.dues = newFeePayment.monthlyDues.reduce((acc, due) => acc + due.dueAmount, 0);

// //             const savedFeePayment = await newFeePayment.save();
// //             res.status(201).json({
// //                 success: true,
// //                 message: "Fee Status is Saved Successfully",
// //                 data: savedFeePayment
// //             });
// //         }
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Fee Status is not created Successfully",
// //             error: error.message
// //         });
// //     }
// // };



// // exports.createOrUpdateFeePayment = async (req, res) => {
// //     try {
// //         const { admissionNumber, feeHistory, className } = req.body;
// //         const schoolId = req.user.schoolId;
// //         const year = new Date().getFullYear(); // Get the current year dynamically

// //         // Fetch the monthly fee for the class dynamically from the database
// //         const monthlyFee = await getMonthlyFeeForClass(schoolId, className);

// //         // Debugging logs
// //         console.log(`Monthly fee for class ${className}: ${monthlyFee}`);

// //         const existingFeePayment = await FeeStatus.findOne({
// //             schoolId,
// //             admissionNumber,
// //             year,
// //         });

// //         // Check for duplicate months in fee history
// //         if (existingFeePayment) {
// //             const existingMonths = existingFeePayment.feeHistory.map(entry => entry.month);
// //             const duplicateMonths = feeHistory.filter(entry => existingMonths.includes(entry.month));

// //             if (duplicateMonths.length > 0) {
// //                 return res.status(400).json({
// //                     success: false,
// //                     message: `Fee for month(s) ${duplicateMonths.map(entry => entry.month).join(', ')} already exists for the year ${year}`,
// //                 });
// //             }
// //         }

// //         // Generate unique fee receipt numbers for each fee history entry
// //         feeHistory.forEach(entry => {
// //             entry.feeReceiptNumber = generateUniqueFeeReceiptNumber();
// //         });

// //         if (existingFeePayment) {
// //             // Add the new fee history entries and update monthly dues
// //             feeHistory.forEach(entry => {
// //                 existingFeePayment.feeHistory.push(entry);
// //                 let monthlyDue = existingFeePayment.monthlyDues.find(due => due.month === entry.month);
// //                 if (monthlyDue) {
// //                     monthlyDue.dueAmount -= entry.paidAmount;
// //                 } else {
// //                     existingFeePayment.monthlyDues.push({
// //                         month: entry.month,
// //                         dueAmount: monthlyFee - entry.paidAmount
// //                     });
// //                 }
// //             });

// //             // Ensure monthly dues are correct for all months
// //             let monthlyDuesMap = {};
// //             existingFeePayment.feeHistory.forEach(entry => {
// //                 if (!monthlyDuesMap[entry.month]) {
// //                     monthlyDuesMap[entry.month] = monthlyFee;
// //                 }
// //                 monthlyDuesMap[entry.month] -= entry.paidAmount;
// //             });

// //             existingFeePayment.monthlyDues = Object.keys(monthlyDuesMap).map(month => ({
// //                 month: month,
// //                 dueAmount: monthlyDuesMap[month]
// //             }));

// //             // Recalculate the total dues
// //             existingFeePayment.dues = existingFeePayment.monthlyDues.reduce((acc, due) => acc + due.dueAmount, 0);

// //             const updatedFeePayment = await existingFeePayment.save();
// //             res.status(201).json({
// //                 success: true,
// //                 message: "Fee Status is Saved Successfully",
// //                 data: updatedFeePayment
// //             });
// //         } else {
// //             const newFeePayment = new FeeStatus({
// //                 schoolId,
// //                 admissionNumber,
// //                 year,
// //                 dues: 0,
// //                 feeHistory,
// //                 monthlyDues: []
// //             });

// //             // Calculate the initial dues based on the fee history
// //             let monthlyDuesMap = {};
// //             feeHistory.forEach(entry => {
// //                 if (!monthlyDuesMap[entry.month]) {
// //                     monthlyDuesMap[entry.month] = monthlyFee;
// //                 }
// //                 monthlyDuesMap[entry.month] -= entry.paidAmount;
// //             });

// //             newFeePayment.monthlyDues = Object.keys(monthlyDuesMap).map(month => ({
// //                 month: month,
// //                 dueAmount: monthlyDuesMap[month]
// //             }));

// //             // Calculate the total dues
// //             newFeePayment.dues = newFeePayment.monthlyDues.reduce((acc, due) => acc + due.dueAmount, 0);

// //             const savedFeePayment = await newFeePayment.save();
// //             res.status(201).json({
// //                 success: true,
// //                 message: "Fee Status is Saved Successfully",
// //                 data: savedFeePayment
// //             });
// //         }
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Fee Status is not created Successfully",
// //             error: error.message
// //         });
// //     }
// // };



// // exports.getFeeHistory = async (req, res) => {
// //     try {
// //         const { admissionNumber } = req.query;

// //         let filter = {
// //             schoolId: req.user.schoolId,
// //             ...(admissionNumber ? { admissionNumber: admissionNumber } : {})
// //         };

// //         const feeStatusData = await FeeStatus.find(filter).exec();

// //         let feeHistory = [];
// //         for (const feeStatus of feeStatusData) {
// //             const studentData = await NewStudentModel.findOne({ admissionNumber: feeStatus.admissionNumber }, 'fullName class admissionNumber').exec();

// //             // Check if studentData exists before using it
// //             if (studentData) {
// //                 feeStatus.feeHistory.forEach(history => {
// //                     const monthDue = feeStatus.monthlyDues.find(md => md.month === history.month);
// //                     feeHistory.push({
// //                         admissionNumber: studentData.admissionNumber,
// //                         studentName: studentData.fullName,
// //                         studentClass: studentData.class,
// //                         feeReceiptNumber: history.feeReceiptNumber,
// //                         paymentMode: history.paymentMode,
// //                         dues: monthDue ? monthDue.dueAmount : 0, // Get dues for the specific month
// //                         ...history._doc
// //                     });
// //                 });
// //             } else {
// //                 console.error(`Student with admissionNumber ${feeStatus.admissionNumber} not found`);
// //             }
// //         }

// //         // Sort fee history by date in descending order
// //         feeHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

// //         res.status(200).json({
// //             success: true,
// //             message: "Fee history retrieved successfully",
// //             data: feeHistory,
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Failed to retrieve fee history",
// //             error: error.message,
// //         });
// //     }
// // };








// // // exports.createExam = async (req, res) => {
// // //     try {

// // //         const {studentId, year, feeHistory} = req.body;

// // //         // if (!examName || !className || !section || !examInfo) {
// // //         //     return res.status(404).json({
// // //         //         success: false,
// // //         //         message: "Record Not Found Please Fill All Required Details"
// // //         //     })
// // //         // }

// // //         // const existExam = await ExamModel.findOne({
// // //         //     "schoolId": req.user.schoolId,
// // //         //     "className": req.user.classTeacher,
// // //         //     "section": req.user.section
// // //         // })

// // //         // if (existExam) {
// // //         //     return res.status(400).json({
// // //         //         success: false,
// // //         //         message: "Exam of that class and section is already created"
// // //         //     })
// // //         // }

// // //         const feesData = await FeeStatus.create({
// // //             schoolId: req.user.schoolId,
// // //             studentId,
// // //             year
// // //         })

// // //         res.status(201).json({
// // //             success: true,
// // //             message: "Exam is Successfully Created",
// // //             examData
// // //         })

// // //     }
// // //     catch (error) {
// // //         res.status(500).json({
// // //             success: false,
// // //             message: "Exam is not created Successfully",
// // //             error: error.message
// // //         })
// // //     }
// // // }

// // // exports.deleteExam = async (req, res) => {
// // //     try {

// // //         const {examId} = req.params;

// // //         const existExam = await ExamModel.findById(examId);

// // //         if (!existExam) {
// // //             return res.status(404).json({
// // //                 success: false,
// // //                 message: "Exam Data not found"
// // //             })
// // //         }

// // //         const deletedExam = await existExam.deleteOne();

// // //         res.status(200).json({
// // //             success: true,
// // //             message: "Deleted Exam Info is Successfully",
// // //             deletedExam
// // //         })

// // //     } 
// // //     catch (error) {

// // //         res.status(500).json({
// // //             success: false,
// // //             message: "Delete info of Exam not done successfully due to error",
// // //             error: error.message
// // //         })

// // //     }
// // // }

// // // exports.updateExam = async (req, res) => {
// // //     try {

// // //         const {...examFields} = req.body;

// // //         const existExamData = await ExamModel.findOne({
// // //             schoolId: req.user.schoolId,
// // //             className: examFields.className,
// // //             section: examFields.section
// // //         })

// // //         if (!existExamData) {
// // //             return res.status(400).json({
// // //                 success: false,
// // //                 message: "Exam Details is not found"
// // //             })
// // //         }

// // //         for (const key in examFields) {

// // //             if (key === "examName" || key === "examInfo")
// // //                 existExamData[key] = examFields[key]
// // //         }

// // //         const updatedExamData = await existExamData.save();

// // //         res.status(200).json({
// // //             success: true,
// // //             message: "Exam Details is successfully updated",
// // //             updatedExamData
// // //         })

// // //     }
// // //     catch (error) {

// // //         res.status(500).json({
// // //             success: false,
// // //             message: "Update Details of Exam is not successfully",
// // //             error: error.message
// // //         })

// // //     }
// // // }





// // Updated last code in case needed
// // const FeeStatus = require("../models/feeStatus");
// // const NewStudentModel = require("../models/newStudentModel");
// // const FeeStructure = require("../models/feeStructureModel");

// // // Utility function to generate unique fee receipt number
// // function generateUniqueFeeReceiptNumber() {
// //     const characters = 'ABC0123456789';
// //     let result = '';
// //     for (let i = 0; i < 5; i++) {
// //         result += characters.charAt(Math.floor(Math.random() * characters.length));
// //     }
// //     return result;
// // }

// // // Function to fetch the monthly fee for a class dynamically from the database
// // async function getMonthlyFeeForClass(schoolId, className) {
// //     try {
// //         const feeStructure = await FeeStructure.findOne({
// //             schoolId: schoolId,
// //             className: className,
// //             additional: false // Assuming 'additional' field distinguishes monthly fees from other fees
// //         });

// //         if (!feeStructure) {
// //             throw new Error(`Fee structure for class ${className} not found`);
// //         }

// //         return feeStructure.amount;
// //     } catch (error) {
// //         throw new Error(`Failed to fetch monthly fee for class ${className}: ${error.message}`);
// //     }
// // }


// // exports.createOrUpdateFeePayment = async (req, res) => {
// //     try {
// //         const { admissionNumber, feeHistory, className } = req.body;
// //         const schoolId = req.user.schoolId;
// //         const year = new Date().getFullYear(); // Get the current year dynamically

// //         // Fetch the monthly fee for the class dynamically from the database
// //         const monthlyFee = await getMonthlyFeeForClass(schoolId, className);

// //         // Debugging logs
// //         console.log(`Monthly fee for class ${className}: ${monthlyFee}`);

// //         const existingFeePayment = await FeeStatus.findOne({
// //             schoolId,
// //             admissionNumber,
// //             year,
// //         });

// //         // Check for duplicate months in fee history
// //         if (existingFeePayment) {
// //             const existingMonths = existingFeePayment.feeHistory.map(entry => entry.month);
// //             const duplicateMonths = feeHistory.filter(entry => existingMonths.includes(entry.month));

// //             if (duplicateMonths.length > 0) {
// //                 return res.status(400).json({
// //                     success: false,
// //                     message: `Fee for month(s) ${duplicateMonths.map(entry => entry.month).join(', ')} already exists for the year ${year}`,
// //                 });
// //             }
// //         }

// //         // Generate unique fee receipt numbers for each fee history entry
// //         feeHistory.forEach(entry => {
// //             entry.feeReceiptNumber = generateUniqueFeeReceiptNumber();
// //             entry.date = new Date(); // Add the current timestamp
// //         });

// //         if (existingFeePayment) {
// //             // Add the new fee history entries and update monthly dues
// //             feeHistory.forEach(entry => {
// //                 existingFeePayment.feeHistory.push(entry);
// //                 let monthlyDue = existingFeePayment.monthlyDues.find(due => due.month === entry.month);
// //                 if (monthlyDue) {
// //                     monthlyDue.dueAmount -= entry.paidAmount;
// //                 } else {
// //                     existingFeePayment.monthlyDues.push({
// //                         month: entry.month,
// //                         dueAmount: monthlyFee - entry.paidAmount
// //                     });
// //                 }
// //             });

// //             // Ensure monthly dues are correct for all months
// //             let monthlyDuesMap = {};
// //             existingFeePayment.feeHistory.forEach(entry => {
// //                 if (!monthlyDuesMap[entry.month]) {
// //                     monthlyDuesMap[entry.month] = monthlyFee;
// //                 }
// //                 monthlyDuesMap[entry.month] -= entry.paidAmount;
// //             });

// //             existingFeePayment.monthlyDues = Object.keys(monthlyDuesMap).map(month => ({
// //                 month: month,
// //                 dueAmount: monthlyDuesMap[month]
// //             }));

// //             // Recalculate the total dues
// //             existingFeePayment.dues = existingFeePayment.monthlyDues.reduce((acc, due) => acc + due.dueAmount, 0);

// //             const updatedFeePayment = await existingFeePayment.save();
// //             res.status(201).json({
// //                 success: true,
// //                 message: "Fee Status is Saved Successfully",
// //                 data: updatedFeePayment
// //             });
// //         } else {
// //             const newFeePayment = new FeeStatus({
// //                 schoolId,
// //                 admissionNumber,
// //                 year,
// //                 dues: 0,
// //                 feeHistory,
// //                 monthlyDues: []
// //             });

// //             // Calculate the initial dues based on the fee history
// //             let monthlyDuesMap = {};
// //             feeHistory.forEach(entry => {
// //                 if (!monthlyDuesMap[entry.month]) {
// //                     monthlyDuesMap[entry.month] = monthlyFee;
// //                 }
// //                 monthlyDuesMap[entry.month] -= entry.paidAmount;
// //             });

// //             newFeePayment.monthlyDues = Object.keys(monthlyDuesMap).map(month => ({
// //                 month: month,
// //                 dueAmount: monthlyDuesMap[month]
// //             }));

// //             // Calculate the total dues
// //             newFeePayment.dues = newFeePayment.monthlyDues.reduce((acc, due) => acc + due.dueAmount, 0);

// //             const savedFeePayment = await newFeePayment.save();
// //             res.status(201).json({
// //                 success: true,
// //                 message: "Fee Status is Saved Successfully",
// //                 data: savedFeePayment
// //             });
// //         }
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Fee Status is not created Successfully",
// //             error: error.message
// //         });
// //     }
// // };



// // exports.getFeeStatus = async (req, res) => {
// //     try {
// //         const { admissionNumber } = req.query;

// //         let filter = {
// //             ...(admissionNumber ? { admissionNumber: admissionNumber } : {}),
// //         };

// //         const feesData = await FeeStatus.find({ schoolId: req.user.schoolId, ...filter });

// //         res.status(200).json({
// //             success: true,
// //             message: "Fees Data Successfully Get",
// //             data: feesData
// //         });

// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Fees Details is not get Successfully",
// //             error: error.message
// //         });
// //     }
// // };


// // exports.feeIncomeMonths = async (req, res) => {
// //     try {

// //         const feesData = await FeeStatus.find({ schoolId: req.user.schoolId });

// //         let arr = new Array(12);

// //         for (let i=0; i<12; i++) arr[i] = 0;

// //         console.log("feesData.length", feesData.length)

// //         for (let j=0; j<feesData.length; j++) {

// //             console.log("feesData[j].feeHistory.length", feesData[j].feeHistory.length)
// //             for (let k=0; k<feesData[j].feeHistory.length; k++) {

// //                 console.log("feesData[j].feeHistory[k].paidAmount", feesData[j].feeHistory[k].paidAmount);
// //                 arr[k] += Number(feesData[j].feeHistory[k].paidAmount);
// //             }

// //         }

// //         console.log(arr);

// //         res.status(200).json({
// //             success: true,
// //             message: "Fees Data Successfully Get",
// //             data: arr
// //         })

// //     }
// //     catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Fee Income According to month is not get due to error",
// //             error: error.message
// //         })
// //     }
// // }


// // exports.getFeeHistory = async (req, res) => {
// //     try {
// //         const { admissionNumber } = req.query;

// //         let filter = {
// //             schoolId: req.user.schoolId,
// //             ...(admissionNumber ? { admissionNumber: admissionNumber } : {})
// //         };

// //         const feeStatusData = await FeeStatus.find(filter).exec();

// //         let feeHistory = [];
// //         for (const feeStatus of feeStatusData) {
// //             const studentData = await NewStudentModel.findOne({ admissionNumber: feeStatus.admissionNumber }, 'fullName class admissionNumber').exec();

// //             // Check if studentData exists before using it
// //             if (studentData) {
// //                 feeStatus.feeHistory.forEach(history => {
// //                     const monthDue = feeStatus.monthlyDues.find(md => md.month === history.month);
// //                     feeHistory.push({
// //                         admissionNumber: studentData.admissionNumber,
// //                         studentName: studentData.fullName,
// //                         studentClass: studentData.class,
// //                         feeReceiptNumber: history.feeReceiptNumber,
// //                         paymentMode: history.paymentMode,
// //                         dues: monthDue ? monthDue.dueAmount : 0, // Get dues for the specific month
// //                         ...history._doc
// //                     });
// //                 });
// //             } else {
// //                 console.error(`Student with admissionNumber ${feeStatus.admissionNumber} not found`);
// //             }
// //         }

// //         // Sort the entire feeHistory by date in descending order
// //         feeHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

// //         res.status(200).json({
// //             success: true,
// //             message: "Fee history retrieved successfully",
// //             data: feeHistory,
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Failed to retrieve fee history",
// //             error: error.message,
// //         });
// //     }
// // };
// // End of code of last updated working



// // NEW CODE ALL WORKING WELL

// // const FeeStatus = require("../models/feeStatus");
// // const NewStudentModel = require("../models/newStudentModel");
// // const FeeStructure = require("../models/feeStructureModel");

// // // Utility function to generate unique fee receipt number
// // function generateUniqueFeeReceiptNumber() {
// //     const characters = 'ABC0123456789';
// //     let result = '';
// //     for (let i = 0; i < 5; i++) {
// //         result += characters.charAt(Math.floor(Math.random() * characters.length));
// //     }
// //     return result;
// // }

// // // Function to fetch the monthly fee for a class dynamically from the database
// // async function getMonthlyFeeForClass(schoolId, className) {
// //     try {
// //         const feeStructure = await FeeStructure.findOne({
// //             schoolId: schoolId,
// //             className: className,
// //             additional: false // Assuming 'additional' field distinguishes monthly fees from other fees
// //         });

// //         if (!feeStructure) {
// //             throw new Error(`Fee structure for class ${className} not found`);
// //         }

// //         return feeStructure.amount;
// //     } catch (error) {
// //         throw new Error(`Failed to fetch monthly fee for class ${className}: ${error.message}`);
// //     }
// // }

// // exports.createOrUpdateFeePayment = async (req, res) => {
// //     try {
// //         const { admissionNumber, feeHistory, className } = req.body;
// //         const schoolId = req.user.schoolId;
// //         const year = new Date().getFullYear(); // Get the current year dynamically

// //         // Fetch the monthly fee for the class dynamically from the database
// //         const monthlyFee = await getMonthlyFeeForClass(schoolId, className);

// //         // Debugging logs
// //         console.log(`Monthly fee for class ${className}: ${monthlyFee}`);

// //         const existingFeePayment = await FeeStatus.findOne({
// //             schoolId,
// //             admissionNumber,
// //             year,
// //         });

// //         // Check for duplicate months in fee history
// //         if (existingFeePayment) {
// //             const existingMonths = existingFeePayment.feeHistory.map(entry => entry.month);
// //             const duplicateMonths = feeHistory.filter(entry => existingMonths.includes(entry.month));

// //             if (duplicateMonths.length > 0) {
// //                 return res.status(400).json({
// //                     success: false,
// //                     message: `Fee for month(s) ${duplicateMonths.map(entry => entry.month).join(', ')} already exists for the year ${year}`,
// //                 });
// //             }
// //         }

// //         // Generate unique fee receipt numbers for each fee history entry
// //         feeHistory.forEach(entry => {
// //             entry.feeReceiptNumber = generateUniqueFeeReceiptNumber();
// //             entry.date = new Date(); // Add the current timestamp
// //         });

// //         if (existingFeePayment) {
// //             // Add the new fee history entries and update monthly dues
// //             feeHistory.forEach(entry => {
// //                 existingFeePayment.feeHistory.push(entry);
// //                 let monthlyDue = existingFeePayment.monthlyDues.find(due => due.month === entry.month);
// //                 if (monthlyDue) {
// //                     monthlyDue.dueAmount -= entry.paidAmount;
// //                 } else {
// //                     existingFeePayment.monthlyDues.push({
// //                         month: entry.month,
// //                         dueAmount: monthlyFee - entry.paidAmount
// //                     });
// //                 }
// //             });

// //             // Ensure monthly dues are correct for all months
// //             let monthlyDuesMap = {};
// //             existingFeePayment.feeHistory.forEach(entry => {
// //                 if (!monthlyDuesMap[entry.month]) {
// //                     monthlyDuesMap[entry.month] = monthlyFee;
// //                 }
// //                 monthlyDuesMap[entry.month] -= entry.paidAmount;
// //             });

// //             existingFeePayment.monthlyDues = Object.keys(monthlyDuesMap).map(month => ({
// //                 month: month,
// //                 dueAmount: monthlyDuesMap[month]
// //             }));

// //             // Recalculate the total dues
// //             existingFeePayment.dues = existingFeePayment.monthlyDues.reduce((acc, due) => acc + due.dueAmount, 0);

// //             const updatedFeePayment = await existingFeePayment.save();
// //             res.status(201).json({
// //                 success: true,
// //                 message: "Fee Status is Saved Successfully",
// //                 data: updatedFeePayment
// //             });
// //         } else {
// //             const newFeePayment = new FeeStatus({
// //                 schoolId,
// //                 admissionNumber,
// //                 year,
// //                 dues: 0,
// //                 feeHistory,
// //                 monthlyDues: []
// //             });

// //             // Calculate the initial dues based on the fee history
// //             let monthlyDuesMap = {};
// //             feeHistory.forEach(entry => {
// //                 if (!monthlyDuesMap[entry.month]) {
// //                     monthlyDuesMap[entry.month] = monthlyFee;
// //                 }
// //                 monthlyDuesMap[entry.month] -= entry.paidAmount;
// //             });

// //             newFeePayment.monthlyDues = Object.keys(monthlyDuesMap).map(month => ({
// //                 month: month,
// //                 dueAmount: monthlyDuesMap[month]
// //             }));

// //             // Calculate the total dues
// //             newFeePayment.dues = newFeePayment.monthlyDues.reduce((acc, due) => acc + due.dueAmount, 0);

// //             const savedFeePayment = await newFeePayment.save();
// //             res.status(201).json({
// //                 success: true,
// //                 message: "Fee Status is Saved Successfully",
// //                 data: savedFeePayment
// //             });
// //         }
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Fee Status is not created Successfully",
// //             error: error.message
// //         });
// //     }
// // };



// // exports.getFeeStatus = async (req, res) => {
// //     try {
// //         const { admissionNumber } = req.query;

// //         let filter = {
// //             ...(admissionNumber ? { admissionNumber: admissionNumber } : {}),
// //             schoolId: req.user.schoolId
// //         };

// //         const feesData = await FeeStatus.find(filter).lean();

// //         if (feesData.length === 0) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "No fee status found for the provided filter",
// //                 data: []
// //             });
// //         }

// //         // Fetch student details for each fee status
// //         const studentDetailsPromises = feesData.map(async (feeStatus) => {
// //             const studentData = await NewStudentModel.findOne({ admissionNumber: feeStatus.admissionNumber })
// //                 .select('fullName admissionNumber class fatherName address contact image')
// //                 .lean();

// //             // Update the feeHistory array with dueAmount
// //             const updatedFeeHistory = feeStatus.feeHistory.map((feeEntry) => {
// //                 const monthlyDue = feeStatus.monthlyDues.find(due => due.month === feeEntry.month);
// //                 const totalAmount = monthlyDue ? monthlyDue.dueAmount + feeEntry.paidAmount : feeEntry.paidAmount;
// //                 const dueAmount = totalAmount - feeEntry.paidAmount;

// //                 return {
// //                     ...feeEntry,
// //                     dueAmount
// //                 };
// //             });

// //             return {
// //                 ...feeStatus,
// //                 feeHistory: updatedFeeHistory, // Include the updated feeHistory with dueAmount
// //                 studentDetails: studentData
// //             };
// //         });

// //         const feesDataWithStudentDetails = await Promise.all(studentDetailsPromises);

// //         res.status(200).json({
// //             success: true,
// //             message: "Fees Data Successfully Get",
// //             data: feesDataWithStudentDetails
// //         });

// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Fees Details is not get Successfully",
// //             error: error.message
// //         });
// //     }
// // };



// // exports.feeIncomeMonths = async (req, res) => {
// //     try {
// //         const feesData = await FeeStatus.find({ schoolId: req.user.schoolId });

// //         // Initialize the array with 12 zeros for each month
// //         let arr = new Array(12).fill(0);

// //         console.log("feesData.length", feesData.length);

// //         const monthToIndex = {
// //             'January': 0,
// //             'February': 1,
// //             'March': 2,
// //             'April': 3,
// //             'May': 4,
// //             'June': 5,
// //             'July': 6,
// //             'August': 7,
// //             'September': 8,
// //             'October': 9,
// //             'November': 10,
// //             'December': 11
// //         };

// //         for (let j = 0; j < feesData.length; j++) {
// //             console.log("feesData[j].feeHistory.length", feesData[j].feeHistory.length);
// //             for (let k = 0; k < feesData[j].feeHistory.length; k++) {
// //                 const feeHistoryEntry = feesData[j].feeHistory[k];
// //                 console.log("feeHistoryEntry:", feeHistoryEntry);

// //                 // Convert month name to an index (0-11)
// //                 const monthIndex = monthToIndex[feeHistoryEntry.month];
// //                 console.log(`Month index for ${feeHistoryEntry.month}:`, monthIndex + 1);

// //                 arr[monthIndex] += Number(feeHistoryEntry.paidAmount);
// //             }
// //         }

// //         console.log(arr);

// //         res.status(200).json({
// //             success: true,
// //             message: "Fees Data Successfully Get",
// //             data: arr
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Fee Income According to month is not get due to error",
// //             error: error.message
// //         });
// //     }
// // };


// // exports.getFeeHistory = async (req, res) => {
// //     try {
// //         const { admissionNumber } = req.query;

// //         let filter = {
// //             schoolId: req.user.schoolId,
// //             ...(admissionNumber ? { admissionNumber: admissionNumber } : {})
// //         };

// //         const feeStatusData = await FeeStatus.find(filter).exec();

// //         let feeHistory = [];
// //         for (const feeStatus of feeStatusData) {
// //             const studentData = await NewStudentModel.findOne({ admissionNumber: feeStatus.admissionNumber }, 'fullName class admissionNumber').exec();

// //             // Check if studentData exists before using it
// //             if (studentData) {
// //                 feeStatus.feeHistory.forEach(history => {
// //                     const monthDue = feeStatus.monthlyDues.find(md => md.month === history.month);
// //                     feeHistory.push({
// //                         admissionNumber: studentData.admissionNumber,
// //                         studentName: studentData.fullName,
// //                         studentClass: studentData.class,
// //                         feeReceiptNumber: history.feeReceiptNumber,
// //                         paymentMode: history.paymentMode,
// //                         dues: monthDue ? monthDue.dueAmount : 0, // Get dues for the specific month
// //                         ...history._doc
// //                     });
// //                 });
// //             } else {
// //                 console.error(`Student with admissionNumber ${feeStatus.admissionNumber} not found`);
// //             }
// //         }

// //         // Sort the entire feeHistory by date in descending order
// //         feeHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

// //         res.status(200).json({
// //             success: true,
// //             message: "Fee history retrieved successfully",
// //             data: feeHistory,
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Failed to retrieve fee history",
// //             error: error.message,
// //         });
// //     }
// // };


// // // EDIT FEESTATUS CONTROLLER
// // exports.editFeeStatus = async (req, res) => {
// //     try {
// //       const { receiptNumber } = req.params;
// //       const updateData = req.body;
  
// //       // Find and update the fee status
// //       const feeStatus = await FeeStatus.findOneAndUpdate(
// //         { "feeHistory.feeReceiptNumber": receiptNumber },
// //         { $set: { "feeHistory.$": updateData } },
// //         { new: true }
// //       );
  
// //       if (!feeStatus) {
// //         return res.status(404).json({
// //           success: false,
// //           message: "Fee status not found",
// //         });
// //       }
  
// //       res.status(200).json({
// //         success: true,
// //         message: "Fee status updated successfully",
// //         data: feeStatus,
// //       });
// //     } catch (error) {
// //       res.status(500).json({
// //         success: false,
// //         message: "Failed to update fee status due to an error.",
// //         error: error.message,
// //       });
// //     }
// //   };
  
// // // DELETE FEESTATUS CONTROLLER
// // exports.deleteFeeStatus = async (req, res) => {
// //     try {
// //       const { receiptNumber } = req.params;
  
// //       // Find and update the fee status
// //       const feeStatus = await FeeStatus.findOneAndUpdate(
// //         { "feeHistory.feeReceiptNumber": receiptNumber },
// //         { $pull: { feeHistory: { feeReceiptNumber: receiptNumber } } },
// //         { new: true }
// //       );
  
// //       if (!feeStatus) {
// //         return res.status(404).json({
// //           success: false,
// //           message: "Fee status not found",
// //         });
// //       }
  
// //       res.status(200).json({
// //         success: true,
// //         message: "Fee status deleted successfully",
// //         data: feeStatus,
// //       });
// //     } catch (error) {
// //       res.status(500).json({
// //         success: false,
// //         message: "Failed to delete fee status due to an error.",
// //         error: error.message,
// //       });
// //     }
// //   };
  

// // exports.getFeeStatus = async (req, res) => {
// //     try {
// //         const { admissionNumber } = req.query;

// //         let filter = {
// //             ...(admissionNumber ? { admissionNumber: admissionNumber } : {}),
// //             schoolId: req.user.schoolId
// //         };

// //         const feesData = await FeeStatus.find(filter).lean(); // Use .lean() to convert Mongoose documents to plain JavaScript objects

// //         if (feesData.length === 0) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "No fee status found for the provided filter",
// //                 data: []
// //             });
// //         }

// //         // Fetch student details for each fee status
// //         const studentDetailsPromises = feesData.map(async (feeStatus) => {
// //             const studentData = await NewStudentModel.findOne({ admissionNumber: feeStatus.admissionNumber })
// //                 .select('fullName admissionNumber class fatherName address contact image') // Select only the required fields
// //                 .lean(); // Use .lean() to convert Mongoose documents to plain JavaScript objects

// //             return {
// //                 ...feeStatus,
// //                 studentDetails: studentData
// //             };
// //         });

// //         const feesDataWithStudentDetails = await Promise.all(studentDetailsPromises);

// //         res.status(200).json({
// //             success: true,
// //             message: "Fees Data Successfully Get",
// //             data: feesDataWithStudentDetails
// //         });

// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Fees Details is not get Successfully",
// //             error: error.message
// //         });
// //     }
// // };



// // TESTING NEW UPDATED FINAL FEE CODE


// const FeeStatus = require("../models/feeStatus");
// const NewStudentModel = require("../models/newStudentModel");
// const FeeStructure = require("../models/feeStructureModel");

// // Utility function to generate unique fee receipt number
// // Utility function to generate unique fee receipt number
// function generateUniqueFeeReceiptNumber() {
//     const characters = 'ABC0123456789';
//     let result = '';
//     for (let i = 0; i < 5; i++) {
//         result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
// }

// // Function to fetch all fees for a class including additional fees from the database
// async function getAllFeesForClass(schoolId, className) {
//     try {
//         const feeStructures = await FeeStructure.find({
//             schoolId: schoolId,
//             className: className
//         });

//         if (feeStructures.length === 0) {
//             throw new Error(`Fee structure for class ${className} not found`);
//         }

//         return feeStructures;
//     } catch (error) {
//         throw new Error(`Failed to fetch fees for class ${className}: ${error.message}`);
//     }
// }

// exports.createOrUpdateFeePayment = async (req, res) => {
//     try {
//         const {
//             admissionNumber,
//             className,
//             status,
//             date,
//             preDues,
//             additionalFee,
//             regularFee,
//             months,
//             paymentMode,
//             totalAmount,
//         } = req.body;

//         const schoolId = req.user.schoolId;
//         const year = new Date().getFullYear(); // Get the current year dynamically

//         // Fetch all fees for the class dynamically from the database
//         const feeStructures = await getAllFeesForClass(schoolId, className);

//         // Calculate total amount from fetched fees
//         let totalFees = 0;
//         feeStructures.forEach(fee => {
//             totalFees += fee.amount;
//         });

//         // Debugging logs
//         console.log(`Total fees for class ${className}: ${totalFees}`);

//         const existingFeePayment = await FeeStatus.findOne({
//             schoolId,
//             admissionNumber,
//             year,
//         });

//         // Check for duplicate months in fee history
//         if (existingFeePayment) {
//             const existingMonths = existingFeePayment.feeHistory.map(entry => entry.month);
//             const duplicateMonths = months.filter(month => existingMonths.includes(month));

//             if (duplicateMonths.length > 0) {
//                 return res.status(400).json({
//                     success: false,
//                     message: `Fee for month(s) ${duplicateMonths.join(', ')} already exists for the year ${year}`,
//                 });
//             }
//         }

//         // Generate unique fee receipt numbers for each month
//         const feeHistory = months.map(month => ({
//             month: month,
//             paidAmount: regularFee.paidAmount, // Assuming you want to use the regular fee amount
//             feeReceiptNumber: generateUniqueFeeReceiptNumber(),
//             date: new Date() // Add the current timestamp
//         }));

//         if (existingFeePayment) {
//             // Add the new fee history entries and update monthly dues
//             feeHistory.forEach(entry => {
//                 existingFeePayment.feeHistory.push(entry);
//                 let monthlyDue = existingFeePayment.monthlyDues.find(due => due.month === entry.month);
//                 if (monthlyDue) {
//                     monthlyDue.dueAmount -= entry.paidAmount;
//                 } else {
//                     existingFeePayment.monthlyDues.push({
//                         month: entry.month,
//                         dueAmount: totalFees - entry.paidAmount
//                     });
//                 }
//             });

//             // Ensure monthly dues are correct for all months
//             let monthlyDuesMap = {};
//             existingFeePayment.feeHistory.forEach(entry => {
//                 if (!monthlyDuesMap[entry.month]) {
//                     monthlyDuesMap[entry.month] = totalFees;
//                 }
//                 monthlyDuesMap[entry.month] -= entry.paidAmount;
//             });

//             existingFeePayment.monthlyDues = Object.keys(monthlyDuesMap).map(month => ({
//                 month: month,
//                 dueAmount: monthlyDuesMap[month]
//             }));

//             // Recalculate the total dues
//             existingFeePayment.dues = existingFeePayment.monthlyDues.reduce((acc, due) => acc + due.dueAmount, 0);

//             const updatedFeePayment = await existingFeePayment.save();
//             res.status(201).json({
//                 success: true,
//                 message: "Fee Status is Saved Successfully",
//                 data: updatedFeePayment
//             });
//         } else {
//             const newFeePayment = new FeeStatus({
//                 schoolId,
//                 admissionNumber,
//                 year,
//                 dues: 0,
//                 feeHistory,
//                 monthlyDues: []
//             });

//             // Calculate the initial dues based on the fee history
//             let monthlyDuesMap = {};
//             feeHistory.forEach(entry => {
//                 if (!monthlyDuesMap[entry.month]) {
//                     monthlyDuesMap[entry.month] = totalFees;
//                 }
//                 monthlyDuesMap[entry.month] -= entry.paidAmount;
//             });

//             newFeePayment.monthlyDues = Object.keys(monthlyDuesMap).map(month => ({
//                 month: month,
//                 dueAmount: monthlyDuesMap[month]
//             }));

//             // Calculate the total dues
//             newFeePayment.dues = newFeePayment.monthlyDues.reduce((acc, due) => acc + due.dueAmount, 0);

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
//             schoolId: req.user.schoolId
//         };

//         const feesData = await FeeStatus.find(filter).lean();

//         if (feesData.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No fee status found for the provided filter",
//                 data: []
//             });
//         }

//         // Fetch student details for each fee status
//         const studentDetailsPromises = feesData.map(async (feeStatus) => {
//             const studentData = await NewStudentModel.findOne({ admissionNumber: feeStatus.admissionNumber })
//                 .select('fullName admissionNumber class fatherName address contact image')
//                 .lean();

//             // Update the feeHistory array with dueAmount
//             const updatedFeeHistory = feeStatus.feeHistory.map((feeEntry) => {
//                 const monthlyDue = feeStatus.monthlyDues.find(due => due.month === feeEntry.month);
//                 const totalAmount = monthlyDue ? monthlyDue.dueAmount + feeEntry.paidAmount : feeEntry.paidAmount;
//                 const dueAmount = totalAmount - feeEntry.paidAmount;

//                 return {
//                     ...feeEntry,
//                     dueAmount
//                 };
//             });

//             return {
//                 ...feeStatus,
//                 feeHistory: updatedFeeHistory, // Include the updated feeHistory with dueAmount
//                 studentDetails: studentData
//             };
//         });

//         const feesDataWithStudentDetails = await Promise.all(studentDetailsPromises);

//         res.status(200).json({
//             success: true,
//             message: "Fees Data Successfully Get",
//             data: feesDataWithStudentDetails
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

//         // Initialize the array with 12 zeros for each month
//         let arr = new Array(12).fill(0);

//         console.log("feesData.length", feesData.length);

//         const monthToIndex = {
//             'January': 0,
//             'February': 1,
//             'March': 2,
//             'April': 3,
//             'May': 4,
//             'June': 5,
//             'July': 6,
//             'August': 7,
//             'September': 8,
//             'October': 9,
//             'November': 10,
//             'December': 11
//         };

//         for (let j = 0; j < feesData.length; j++) {
//             console.log("feesData[j].feeHistory.length", feesData[j].feeHistory.length);
//             for (let k = 0; k < feesData[j].feeHistory.length; k++) {
//                 const feeHistoryEntry = feesData[j].feeHistory[k];
//                 console.log("feeHistoryEntry:", feeHistoryEntry);

//                 // Convert month name to an index (0-11)
//                 const monthIndex = monthToIndex[feeHistoryEntry.month];
//                 console.log(`Month index for ${feeHistoryEntry.month}:`, monthIndex + 1);

//                 arr[monthIndex] += Number(feeHistoryEntry.paidAmount);
//             }
//         }

//         console.log(arr);

//         res.status(200).json({
//             success: true,
//             message: "Fees Data Successfully Get",
//             data: arr
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Fee Income According to month is not get due to error",
//             error: error.message
//         });
//     }
// };


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
//                 feeStatus.feeHistory.forEach(history => {
//                     const monthDue = feeStatus.monthlyDues.find(md => md.month === history.month);
//                     feeHistory.push({
//                         admissionNumber: studentData.admissionNumber,
//                         studentName: studentData.fullName,
//                         studentClass: studentData.class,
//                         feeReceiptNumber: history.feeReceiptNumber,
//                         paymentMode: history.paymentMode,
//                         dues: monthDue ? monthDue.dueAmount : 0, // Get dues for the specific month
//                         ...history._doc
//                     });
//                 });
//             } else {
//                 console.error(`Student with admissionNumber ${feeStatus.admissionNumber} not found`);
//             }
//         }

//         // Sort the entire feeHistory by date in descending order
//         feeHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

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


// // EDIT FEESTATUS CONTROLLER
// exports.editFeeStatus = async (req, res) => {
//     try {
//       const { receiptNumber } = req.params;
//       const updateData = req.body;
  
//       // Find and update the fee status
//       const feeStatus = await FeeStatus.findOneAndUpdate(
//         { "feeHistory.feeReceiptNumber": receiptNumber },
//         { $set: { "feeHistory.$": updateData } },
//         { new: true }
//       );
  
//       if (!feeStatus) {
//         return res.status(404).json({
//           success: false,
//           message: "Fee status not found",
//         });
//       }
  
//       res.status(200).json({
//         success: true,
//         message: "Fee status updated successfully",
//         data: feeStatus,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Failed to update fee status due to an error.",
//         error: error.message,
//       });
//     }
//   };
  
// // DELETE FEESTATUS CONTROLLER
// exports.deleteFeeStatus = async (req, res) => {
//     try {
//       const { receiptNumber } = req.params;
  
//       // Find and update the fee status
//       const feeStatus = await FeeStatus.findOneAndUpdate(
//         { "feeHistory.feeReceiptNumber": receiptNumber },
//         { $pull: { feeHistory: { feeReceiptNumber: receiptNumber } } },
//         { new: true }
//       );
  
//       if (!feeStatus) {
//         return res.status(404).json({
//           success: false,
//           message: "Fee status not found",
//         });
//       }
  
//       res.status(200).json({
//         success: true,
//         message: "Fee status deleted successfully",
//         data: feeStatus,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Failed to delete fee status due to an error.",
//         error: error.message,
//       });
//     }
//   };


// NEW------------------
const NewStudentModel = require("../models/newStudentModel");
const FeeStatus = require("../models/feeStatus");
const FeeStructure = require("../models/feeStructureModel");

// Utility function to generate unique fee receipt number
function generateUniqueFeeReceiptNumber() {
    const characters = 'ABC0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to fetch the monthly fee for a class dynamically from the database
async function getFeesForClass(schoolId, className) {
    try {
        // Fetch all fees (both regular and additional) for the specified class
        const fees = await FeeStructure.find({
            schoolId: schoolId,
            className: className
        });

        if (fees.length === 0) {
            throw new Error(`No fee structure found for class ${className}`);
        }

        return fees;
    } catch (error) {
        throw new Error(`Failed to fetch fees for class ${className}: ${error.message}`);
    }
}

exports.createOrUpdateFeePayment = async (req, res) => {
    try {
        const { admissionNumber, feeHistory, className } = req.body;
        const schoolId = req.user.schoolId;
        const year = new Date().getFullYear(); // Get the current year dynamically

        // Fetch all fees (both regular and additional) for the class
        const fees = await getFeesForClass(schoolId, className);

        // Calculate the regular and additional fees separately
        let totalRegularFee = 0;
        let totalAdditionalFees = {};

        fees.forEach(fee => {
            if (fee.additional) {
                if (!totalAdditionalFees[fee.name]) {
                    totalAdditionalFees[fee.name] = 0;
                }
                totalAdditionalFees[fee.name] += fee.amount;
            } else {
                totalRegularFee += fee.amount;
            }
        });

        const existingFeePayment = await FeeStatus.findOne({
            schoolId,
            admissionNumber,
            year,
        });

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

        feeHistory.forEach(entry => {
            entry.feeReceiptNumber = generateUniqueFeeReceiptNumber();
            entry.date = new Date();

            // Handle regular fees
            entry.regularFees = entry.regularFees || [];
            entry.regularFees.forEach(fee => {
                fee.paidAmount = fee.paidAmount || 0;
            });

            // Handle additional fees
            entry.additionalFees = entry.additionalFees || [];
            entry.additionalFees.forEach(fee => {
                fee.paidAmount = fee.paidAmount || 0;
            });

            // Calculate total amount paid
            entry.totalAmountPaid = entry.regularFees.reduce((acc, fee) => acc + fee.paidAmount, 0) +
                                    entry.additionalFees.reduce((acc, fee) => acc + fee.paidAmount, 0);

            // Calculate total dues
            entry.totalDues = (totalRegularFee - entry.regularFees.reduce((acc, fee) => acc + fee.paidAmount, 0)) +
                              Object.keys(totalAdditionalFees).reduce((acc, name) => {
                                  const paidAmount = entry.additionalFees.find(fee => fee.name === name)?.paidAmount || 0;
                                  return acc + (totalAdditionalFees[name] - paidAmount);
                              }, 0);
        });

        if (existingFeePayment) {
            feeHistory.forEach(entry => {
                existingFeePayment.feeHistory.push(entry);

                // Update monthly dues for regular fees
                entry.regularFees.forEach(fee => {
                    let monthlyDue = existingFeePayment.monthlyRegularDues.find(due => due.month === fee.month);
                    if (monthlyDue) {
                        monthlyDue.dueAmount -= fee.paidAmount;
                        monthlyDue.paidAmount += fee.paidAmount;
                    } else {
                        existingFeePayment.monthlyRegularDues.push({
                            month: fee.month,
                            dueAmount: totalRegularFee - fee.paidAmount,
                            paidAmount: fee.paidAmount
                        });
                    }
                });

                // Update monthly dues for additional fees
                entry.additionalFees.forEach(fee => {
                    let monthlyDue = existingFeePayment.monthlyAdditionalDues.find(due => due.name === fee.name && due.month === entry.month);
                    if (monthlyDue) {
                        monthlyDue.dueAmount -= fee.paidAmount;
                        monthlyDue.paidAmount += fee.paidAmount;
                    } else {
                        existingFeePayment.monthlyAdditionalDues.push({
                            name: fee.name,
                            month: entry.month,
                            dueAmount: totalAdditionalFees[fee.name] - fee.paidAmount,
                            paidAmount: fee.paidAmount
                        });
                    }
                });
            });

            existingFeePayment.dues = existingFeePayment.monthlyRegularDues.reduce((acc, due) => acc + due.dueAmount, 0) +
                                      existingFeePayment.monthlyAdditionalDues.reduce((acc, due) => acc + due.dueAmount, 0);

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
                monthlyRegularDues: [],
                monthlyAdditionalDues: []
            });

            feeHistory.forEach(entry => {
                // Initialize monthly dues for regular fees
                entry.regularFees.forEach(fee => {
                    newFeePayment.monthlyRegularDues.push({
                        month: fee.month,
                        dueAmount: totalRegularFee - fee.paidAmount,
                        paidAmount: fee.paidAmount
                    });
                });

                // Initialize monthly dues for additional fees
                entry.additionalFees.forEach(fee => {
                    newFeePayment.monthlyAdditionalDues.push({
                        name: fee.name,
                        month: entry.month,
                        dueAmount: totalAdditionalFees[fee.name] - fee.paidAmount,
                        paidAmount: fee.paidAmount
                    });
                });
            });

            newFeePayment.dues = newFeePayment.monthlyRegularDues.reduce((acc, due) => acc + due.dueAmount, 0) +
                                 newFeePayment.monthlyAdditionalDues.reduce((acc, due) => acc + due.dueAmount, 0);

            const savedFeePayment = await newFeePayment.save();
            res.status(201).json({
                success: true,
                message: "Fee Status is Created Successfully",
                data: savedFeePayment
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};







exports.getFeeStatus = async (req, res) => {
    try {
        const { admissionNumber } = req.query;

        let filter = {
            ...(admissionNumber ? { admissionNumber: admissionNumber } : {}),
            schoolId: req.user.schoolId
        };

        const feesData = await FeeStatus.find(filter).lean();

        if (feesData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No fee status found for the provided filter",
                data: []
            });
        }

        // Fetch student details for each fee status
        const studentDetailsPromises = feesData.map(async (feeStatus) => {
            const studentData = await NewStudentModel.findOne({ admissionNumber: feeStatus.admissionNumber })
                .select('fullName admissionNumber class fatherName address contact image')
                .lean();

            // Update the feeHistory array with dueAmount
            const updatedFeeHistory = feeStatus.feeHistory.map((feeEntry) => {
                const monthlyDue = feeStatus.monthlyDues.find(due => due.month === feeEntry.month);
                const totalAmount = monthlyDue ? monthlyDue.dueAmount + feeEntry.paidAmount : feeEntry.paidAmount;
                const dueAmount = totalAmount - feeEntry.paidAmount;

                return {
                    ...feeEntry,
                    dueAmount
                };
            });

            return {
                ...feeStatus,
                feeHistory: updatedFeeHistory, // Include the updated feeHistory with dueAmount
                studentDetails: studentData
            };
        });

        const feesDataWithStudentDetails = await Promise.all(studentDetailsPromises);

        res.status(200).json({
            success: true,
            message: "Fees Data Successfully Get",
            data: feesDataWithStudentDetails
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

        // Initialize the array with 12 zeros for each month
        let arr = new Array(12).fill(0);

        console.log("feesData.length", feesData.length);

        const monthToIndex = {
            'January': 0,
            'February': 1,
            'March': 2,
            'April': 3,
            'May': 4,
            'June': 5,
            'July': 6,
            'August': 7,
            'September': 8,
            'October': 9,
            'November': 10,
            'December': 11
        };

        for (let j = 0; j < feesData.length; j++) {
            console.log("feesData[j].feeHistory.length", feesData[j].feeHistory.length);
            for (let k = 0; k < feesData[j].feeHistory.length; k++) {
                const feeHistoryEntry = feesData[j].feeHistory[k];
                console.log("feeHistoryEntry:", feeHistoryEntry);

                // Convert month name to an index (0-11)
                const monthIndex = monthToIndex[feeHistoryEntry.month];
                console.log(`Month index for ${feeHistoryEntry.month}:`, monthIndex + 1);

                arr[monthIndex] += Number(feeHistoryEntry.paidAmount);
            }
        }

        console.log(arr);

        res.status(200).json({
            success: true,
            message: "Fees Data Successfully Get",
            data: arr
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Fee Income According to month is not get due to error",
            error: error.message
        });
    }
};


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

        // Sort the entire feeHistory by date in descending order
        feeHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

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


// EDIT FEESTATUS CONTROLLER
exports.editFeeStatus = async (req, res) => {
    try {
      const { receiptNumber } = req.params;
      const updateData = req.body;
  
      // Find and update the fee status
      const feeStatus = await FeeStatus.findOneAndUpdate(
        { "feeHistory.feeReceiptNumber": receiptNumber },
        { $set: { "feeHistory.$": updateData } },
        { new: true }
      );
  
      if (!feeStatus) {
        return res.status(404).json({
          success: false,
          message: "Fee status not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Fee status updated successfully",
        data: feeStatus,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update fee status due to an error.",
        error: error.message,
      });
    }
  };
  
// DELETE FEESTATUS CONTROLLER
exports.deleteFeeStatus = async (req, res) => {
    try {
      const { receiptNumber } = req.params;
  
      // Find and update the fee status
      const feeStatus = await FeeStatus.findOneAndUpdate(
        { "feeHistory.feeReceiptNumber": receiptNumber },
        { $pull: { feeHistory: { feeReceiptNumber: receiptNumber } } },
        { new: true }
      );
  
      if (!feeStatus) {
        return res.status(404).json({
          success: false,
          message: "Fee status not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Fee status deleted successfully",
        data: feeStatus,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete fee status due to an error.",
        error: error.message,
      });
    }
  };
  

exports.getFeeStatus = async (req, res) => {
    try {
        const { admissionNumber } = req.query;

        let filter = {
            ...(admissionNumber ? { admissionNumber: admissionNumber } : {}),
            schoolId: req.user.schoolId
        };

        const feesData = await FeeStatus.find(filter).lean(); // Use .lean() to convert Mongoose documents to plain JavaScript objects

        if (feesData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No fee status found for the provided filter",
                data: []
            });
        }

        // Fetch student details for each fee status
        const studentDetailsPromises = feesData.map(async (feeStatus) => {
            const studentData = await NewStudentModel.findOne({ admissionNumber: feeStatus.admissionNumber })
                .select('fullName admissionNumber class fatherName address contact image') // Select only the required fields
                .lean(); // Use .lean() to convert Mongoose documents to plain JavaScript objects

            return {
                ...feeStatus,
                studentDetails: studentData
            };
        });

        const feesDataWithStudentDetails = await Promise.all(studentDetailsPromises);

        res.status(200).json({
            success: true,
            message: "Fees Data Successfully Get",
            data: feesDataWithStudentDetails
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Fees Details is not get Successfully",
            error: error.message
        });
    }
};
