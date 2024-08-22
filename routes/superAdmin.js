const {Router} = require('express')
const { createAdmin, getAllAdmins } = require('../controllers/superAdminController')
const { singleUpload } = require('../middleware/multer')
const router = Router()

router.post('/createAdmin', singleUpload, createAdmin)
router.get('/getAllAdmins', getAllAdmins);

module.exports = router