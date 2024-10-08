const express = require("express");
const { createOrUpdateFeePayment , getFeeStatus, feeIncomeMonths, getFeeHistory, editFeeStatus, deleteFeeStatus, getAllStudentsFeeStatus, getFeeStatusByMonth, getStudentFeeHistory, getFeeHistoryAndDues} = require("../controllers/feeStatusController");
const { manageDuesPayment, createPayment } = require("../controllers/manageDuesPayment");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.post('/createFeeStatus', verifyToken, createOrUpdateFeePayment);
router.post('/createPayment', verifyToken, createPayment);
router.get('/getFeeStatus', verifyToken, getFeeStatus);
router.get('/feeIncomeMonths', verifyToken, feeIncomeMonths);
router.get('/feeHistory', verifyToken, getFeeHistory);
router.get('/getAllStudentsFeeStatus', verifyToken, getAllStudentsFeeStatus);
router.get('/getFeeStatusByMonth', verifyToken, getFeeStatusByMonth);
router.get('/getStudentFeeHistory/:admissionNumber', verifyToken, getStudentFeeHistory);
router.get('/getFeeHistoryAndDues/:admissionNumber', verifyToken, getFeeHistoryAndDues);
router.put('/editFeeStatus/:receiptNumber', verifyToken, editFeeStatus);
router.delete('/deleteFeeStatus/:receiptNumber', verifyToken, deleteFeeStatus);
// router.delete('/deleteExam/:examId', verifyToken, deleteExam);
// router.put('/updateExam', verifyToken, updateExam);


// DUES MANAGEMENT
router.post('/manageDuesPayment', verifyToken, manageDuesPayment);

module.exports = router;