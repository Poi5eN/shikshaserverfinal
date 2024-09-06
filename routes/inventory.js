const express = require("express");
const { createsellItem, returnsellItem, getItemSellHistory} = require("../controllers/inventoryController");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.post('/createsellItem', verifyToken, createsellItem);
router.put('/returnsellItem', verifyToken, returnsellItem);
router.put('/getItemSellHistory', verifyToken, getItemSellHistory);
// router.get('/getsellItems', verifyToken, getsellItems);
// router.delete('/deleteExam/:examId', verifyToken, deleteExam);
// router.put('/updateExam', verifyToken, updateExam);

module.exports = router;