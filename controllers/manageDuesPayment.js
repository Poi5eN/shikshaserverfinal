const FeeStatus = require("../models/feeStatus");
const FeeStructure = require("../models/feeStructureModel");

// Function to calculate dues for each month
function calculateMonthlyDues(feeEntries, feeMap) {
    let totalPaidAmount = 0;
    let totalDues = 0;

    const fees = feeEntries.map(entry => {
        const feeAmount = feeMap[entry.name || entry.feeType] || 0;
        const paidAmount = entry.paidAmount || 0;
        const dueAmount = feeAmount - paidAmount;
        const status = dueAmount <= 0 ? "Paid" : (paidAmount > 0 ? "Partial Payment" : "Unpaid");

        totalPaidAmount += paidAmount;
        totalDues += dueAmount > 0 ? dueAmount : 0;

        return {
            ...entry,
            dueAmount: dueAmount > 0 ? dueAmount : 0,
            status,
        };
    });

    return { fees, totalPaidAmount, totalDues };
}

// Controller to manage dues and track payment status for an academic year
exports.manageDuesPayment = async (req, res) => {
    try {
        const { admissionNumber, payDuesAmount, className } = req.body;
        const schoolId = req.user.schoolId;
        const year = new Date().getFullYear();

        // Fetch the fee structure for the class
        const fees = await FeeStructure.find({ schoolId, className });
        const regularFeeMap = {};
        const additionalFeeMap = {};

        fees.forEach(fee => {
            if (fee.additional) {
                additionalFeeMap[fee.name] = fee.amount || 0;
            } else {
                regularFeeMap[fee.feeType] = fee.amount || 0;
            }
        });

        // Find the existing fee payment record
        const existingFeePayment = await FeeStatus.findOne({
            schoolId,
            admissionNumber,
            year,
        });

        if (!existingFeePayment) {
            return res.status(404).json({
                success: false,
                message: `No fee payment record found for the student with admission number ${admissionNumber} for year ${year}`,
            });
        }

        // Calculate dues for regular and additional fees
        let { fees: regularFees, totalDues: totalRegularDues } = calculateMonthlyDues(
            existingFeePayment.monthlyDues.regularDues,
            regularFeeMap
        );

        let { fees: additionalFees, totalDues: totalAdditionalDues } = calculateMonthlyDues(
            existingFeePayment.monthlyDues.additionalDues,
            additionalFeeMap
        );

        let totalDues = totalRegularDues + totalAdditionalDues;
        let totalPaidAmount = 0;

        // Apply payment to the dues
        let remainingPayment = payDuesAmount || 0;

        // Pay off regular dues
        for (let i = 0; i < regularFees.length; i++) {
            const fee = regularFees[i];
            if (fee.dueAmount > 0 && remainingPayment > 0) {
                const amountToPay = Math.min(remainingPayment, fee.dueAmount);
                fee.paidAmount += amountToPay;
                fee.dueAmount -= amountToPay;
                remainingPayment -= amountToPay;
                fee.status = fee.dueAmount <= 0 ? "Paid" : "Partial Payment";
            }
        }

        // Pay off additional dues
        for (let i = 0; i < additionalFees.length; i++) {
            const fee = additionalFees[i];
            if (fee.dueAmount > 0 && remainingPayment > 0) {
                const amountToPay = Math.min(remainingPayment, fee.dueAmount);
                fee.paidAmount += amountToPay;
                fee.dueAmount -= amountToPay;
                remainingPayment -= amountToPay;
                fee.status = fee.dueAmount <= 0 ? "Paid" : "Partial Payment";
            }
        }

        // Recalculate total dues after payment
        totalRegularDues = regularFees.reduce((sum, fee) => sum + fee.dueAmount, 0);
        totalAdditionalDues = additionalFees.reduce((sum, fee) => sum + fee.dueAmount, 0);
        totalDues = totalRegularDues + totalAdditionalDues;

        // Update the fee payment record
        existingFeePayment.monthlyDues.regularDues = regularFees;
        existingFeePayment.monthlyDues.additionalDues = additionalFees;
        existingFeePayment.dues = totalDues;
        existingFeePayment.totalAmountPaid += payDuesAmount;

        await existingFeePayment.save();

        res.status(200).json({
            success: true,
            message: "Dues payment processed successfully",
            data: {
                regularFees,
                additionalFees,
                totalDues,
                totalAmountPaid: existingFeePayment.totalAmountPaid,
                remainingPayment,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error processing dues payment",
            error: error.message,
        });
    }
};
