const { addApplication, getLoanApplicationByID, updateApplication, deleteApplication, allApplication, partialUpdateApplication } = require('../controller/loan')
const express = require('express')
const router = express.Router()


router.post("/", addApplication)
router.get("/", allApplication)
router.get("/:id", getLoanApplicationByID)
router.put("/:id", updateApplication)
router.patch("/:id", partialUpdateApplication)
router.delete("/:id", deleteApplication)


module.exports = router;