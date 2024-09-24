// ABOVE CODE WORKING WELL TO REVERT
const NewStudentModel = require("../models/newStudentModel");
const FeeStatus = require("../models/feeStatus");
const FeeStructure = require("../models/feeStructureModel");

// Helper function to generate a unique fee receipt number
function generateUniqueFeeReceiptNumber() {
    const characters = 'ABC0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Helper function to fetch fees for a class
async function getFeesForClass(schoolId, className) {
    try {
        const fees = await FeeStructure.find({ schoolId, className });

        if (fees.length === 0) {
            throw new Error(`No fee structure found for class ${className}`);
        }

        return fees;
    } catch (error) {
        throw new Error(`Failed to fetch fees for class ${className}: ${error.message}`);
    }
}

// Controller to create or update fee payment
exports.createOrUpdateFeePayment = async (req, res) => {
    try {
        const { admissionNumber, className, feeHistory } = req.body;
        const schoolId = req.user.schoolId;
        const year = new Date().getFullYear();

        const fees = await getFeesForClass(schoolId, className);

        const regularFeeMap = {};
        const additionalFeeMap = {};

        // Categorize fees into regular and additional
        fees.forEach(fee => {
            if (fee.additional) {
                additionalFeeMap[fee.name] = fee.amount || 0;
            } else {
                regularFeeMap[fee.feeType] = fee.amount || 0;
            }
        });

        let totalPaidAmount = 0;
        let totalDues = 0;

        // Fetch existing fee payment record
        const existingFeePayment = await FeeStatus.findOne({
            schoolId,
            admissionNumber,
            year,
        });

        // Initialize records if not existing
        const existingRegularFees = existingFeePayment ? existingFeePayment.monthlyDues.regularDues : [];
        const existingAdditionalFees = existingFeePayment ? existingFeePayment.monthlyDues.additionalDues : [];

        // Function to handle fee calculation and validation
        const calculateFees = (entries, feeMap, isRegular) => {
            return entries.map(entry => {
                const feeAmount = feeMap[isRegular ? "Monthly" : entry.name] || 0;
                const previousPaidAmount = isRegular
                    ? existingRegularFees.find(fee => fee.month === entry.month)?.paidAmount || 0
                    : existingAdditionalFees.find(fee => fee.name === entry.name && fee.month === entry.month)?.paidAmount || 0;
                const paidAmount = entry.paidAmount || 0;
                const totalAmountPaid = previousPaidAmount + paidAmount;

                // Check for overpayment
                if (totalAmountPaid > feeAmount) {
                    throw new Error(`Payment for ${isRegular ? 'regular' : 'additional'} fee in ${entry.month || 'N/A'} exceeds the remaining dues.`);
                }

                const dueAmount = feeAmount - totalAmountPaid;
                const status = dueAmount <= 0 ? "Paid" : "Partial Payment";

                totalPaidAmount += paidAmount;
                totalDues += dueAmount > 0 ? dueAmount : 0;

                return {
                    ...entry,
                    dueAmount: dueAmount > 0 ? dueAmount : 0,
                    status
                };
            });
        };

        // Calculate dues for regular fees
        const regularFees = calculateFees(feeHistory.regularFees, regularFeeMap, true);

        // Calculate dues for additional fees
        const additionalFees = calculateFees(feeHistory.additionalFees, additionalFeeMap, false);

        console.log('add',additionalFees)

        // Format the date from the frontend or use the current date
        const date = new Date(feeHistory.date || new Date());
        const formattedDate = date.toLocaleDateString("en-US", {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        const newFeeHistory = {
            date: formattedDate, // Use the formatted date
            status: totalDues <= 0 ? "Paid" : "Partial Payment",
            regularFees,
            additionalFees,
            feeReceiptNumber: generateUniqueFeeReceiptNumber(),
            paymentMode: feeHistory.paymentMode || "N/A",
            transactionId: feeHistory.transactionId || "N/A",
            totalFeeAmount: feeHistory.totalFeeAmount || 0,
            previousDues: feeHistory.previousDues || 0,
            remark: feeHistory.remark || "",
            concessionFee: feeHistory.concessionFee || 0,
            paidAfterConcession: feeHistory.paidAfterConcession || 0,
            newPaidAmount: feeHistory.newPaidAmount || 0,
            totalAmountPaid: totalPaidAmount,
            totalDues
        };

        // return res.status(201).json({message: 'ture',regularFees,additionalFees })
        if (existingFeePayment) {
            existingFeePayment.feeHistory.push(newFeeHistory);

            // Update monthly dues for regular fees
            regularFees.forEach(entry => {
                // let regularDue = existingFeePayment.monthlyDues.regularDues.find(due => due.month === entry.month);
                let regularDue = existingFeePayment.monthlyDues.regularDues.find((due) =>{
                    console.log('due', due.month, '2',entry.month )
                    due.month === entry.month} );
                if (regularDue) {
                    console.log('hi1')
                    regularDue.dueAmount = entry.dueAmount;
                    regularDue.paidAmount = (regularDue.paidAmount || 0) + entry.paidAmount; // Update paid amount
                    regularDue.status = entry.status;
                } else {
                    console.log('hi2')
                    existingFeePayment.monthlyDues.regularDues.push({
                        month: entry.month,
                        dueAmount: entry.dueAmount,
                        paidAmount: entry.paidAmount, // Set paid amount
                        status: entry.status
                    });
                }
            });

            // Update monthly dues for additional fees
            additionalFees.forEach(entry => {
        
                // let additionalDue = existingFeePayment.monthlyDues.additionalDues.find(due => due.name === entry.name && due.month === entry.month);
                let additionalDue = existingFeePayment.monthlyDues.additionalDues.find((due) => {
                    console.log("3123", due.name, '3213', entry.name)
                    console.log("78979", due.month, '7756', entry.month)
                    due.name === entry.name && due.month === entry.month});
                if (additionalDue) {
                    console.log('hi3')
                    additionalDue.dueAmount = entry.dueAmount;
                    additionalDue.paidAmount = (additionalDue.paidAmount || 0) + entry.paidAmount; // Update paid amount
                    additionalDue.status = entry.status;
                } else {
                    console.log('hi4')
                    existingFeePayment.monthlyDues.additionalDues.push({
                        name: entry.name,
                        month: entry.month || "N/A",
                        dueAmount: entry.dueAmount,
                        paidAmount: entry.paidAmount, // Set paid amount
                        status: entry.status
                    });
                }
            });

            existingFeePayment.dues = totalDues;

            const updatedFeePayment = await existingFeePayment.save();
            res.status(201).json({
                success: true,
                message: "Fee Status is Saved Successfully",
                data: updatedFeePayment
            });
        } else {
            additionalFees.map((elem)=>{
                console.log('htyuiplkjh',elem.month)
            })
            const newFeePayment = new FeeStatus({
                schoolId,
                admissionNumber,
                year,
                dues: totalDues,
                feeHistory: [newFeeHistory],
                monthlyDues: {
                    regularDues: regularFees.map(entry => ({
                        month: entry.month,
                        dueAmount: entry.dueAmount,
                        paidAmount: entry.paidAmount, // Set paid amount
                        status: entry.status
                    })),
                    additionalDues: additionalFees.map(entry => ({
                        name: entry.name,
                        month: entry.month || "N/A",
                        dueAmount: entry.dueAmount,
                        paidAmount: entry.paidAmount, // Set paid amount
                        status: entry.status
                    }))
                }
            });

            const savedFeePayment = await newFeePayment.save();
            res.status(201).json({
                success: true,
                message: "Fee Status is Saved Successfully",
                data: savedFeePayment
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Fee Status is not created Successfully",
            error: error.message
        });
    }
};

// Controller to get fee status
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
        const studentDetailsPromises = feesData.map(async feeStatus => {
            const student = await NewStudentModel.findOne({
                schoolId: req.user.schoolId,
                admissionNumber: feeStatus.admissionNumber
            }).lean();

            return {
                ...feeStatus,
                student
            };
        });

        const detailedFeeStatus = await Promise.all(studentDetailsPromises);

        res.status(200).json({
            success: true,
            message: "Fee Status Data Retrieved Successfully",
            data: detailedFeeStatus
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve fee status",
            error: error.message
        });
    }
};


exports.feeIncomeMonths = async (req, res) => {
    try {
        const feesData = await FeeStatus.find({ schoolId: req.user.schoolId });

        // Initialize the array with 12 zeros for each month
        let arr = new Array(12).fill(0);

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

        for (const feeStatus of feesData) {
            for (const feeHistoryEntry of feeStatus.feeHistory) {
                // Convert month name to an index (0-11)
                const monthIndex = monthToIndex[feeHistoryEntry.month];
                
                arr[monthIndex] += Number(feeHistoryEntry.totalAmountPaid); // Accumulate totalAmountPaid
            }
        }

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
                    feeHistory.push({
                        admissionNumber: studentData.admissionNumber,
                        studentName: studentData.fullName,
                        studentClass: studentData.class,
                        feeReceiptNumber: history.feeReceiptNumber,
                        paymentMode: history.paymentMode,
                        dues: history.regularFees.reduce((sum, fee) => sum + fee.dueAmount, 0) + 
                              history.additionalFees.reduce((sum, fee) => sum + fee.dueAmount, 0), // Calculate total dues
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





// // ALL STUDENTS TABLE CREATION FOR FEE MANAGEMENT
// const NewStudentModel = require("../models/newStudentModel");
// const FeeStatus = require("../models/feeStatus");

// Controller to get all students with their fee status
exports.getAllStudentsFeeStatus = async (req, res) => {
    try {
        const schoolId = req.user.schoolId;

        // Fetch all students for the given school
        const students = await NewStudentModel.find({ schoolId }).lean();

        if (students.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No students found for this school",
                data: []
            });
        }

        // Fetch fee statuses for all students in the school
        const feeStatuses = await FeeStatus.find({ schoolId }).lean();

        // Create a map to quickly reference fee status by admission number
        const feeStatusMap = feeStatuses.reduce((map, feeStatus) => {
            map[feeStatus.admissionNumber] = feeStatus;
            return map;
        }, {});

        // Combine student data with fee status
        const studentsWithFeeStatus = students.map(student => {
            const feeStatus = feeStatusMap[student.admissionNumber];

            // If fee status exists, calculate total dues and fee status (Paid/Partial/Unpaid)
            let overallStatus = "Unpaid";
            let totalDues = 0;

            if (feeStatus) {
                totalDues = feeStatus.dues || 0;
                overallStatus = totalDues === 0 ? "Paid" : "Partial";
            }

            return {
                ...student,
                feeStatus: overallStatus,
                totalDues
            };
        });

        res.status(200).json({
            success: true,
            message: "Student Fee Status Data Retrieved Successfully",
            data: studentsWithFeeStatus
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve student fee status data",
            error: error.message
        });
    }
};
