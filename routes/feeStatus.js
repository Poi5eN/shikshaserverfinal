const express = require("express");
const { createOrUpdateFeePayment , getFeeStatus, feeIncomeMonths, getFeeHistory} = require("../controllers/feeStatusController");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.post('/createFeeStatus', verifyToken, createOrUpdateFeePayment);
router.get('/getFeeStatus', verifyToken, getFeeStatus);
router.get('/feeIncomeMonths', verifyToken, feeIncomeMonths);
router.get('/feeHistory', verifyToken, getFeeHistory);
// router.delete('/deleteExam/:examId', verifyToken, deleteExam);
// router.put('/updateExam', verifyToken, updateExam);

module.exports = router;