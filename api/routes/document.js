const express = require("express")
const {
	create,
	findAll,
	findOne,
	update,
	deleteDocument,
} = require("../controller/document.controller")
// const { findAll } = require("../controller/document.controller")
// const { findOne } = require("../controller/document.controller")
// const { update } = require("../controller/document.controller")
// const { deleteDocument } = require("../controller/document.controller")

const router = express.Router()

router.get("", findAll)

router.get("/:id", findOne)

router.post("", create)

router.put("/:id", update)

router.delete("/:id", deleteDocument)

module.exports = router
