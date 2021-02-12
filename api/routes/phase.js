const express = require("express")
const {
	create,
	findAll,
	findOne,
	update,
	deletePhase,
} = require("../controller/phase.controller")

const router = express.Router()

router.get("", findAll)

router.get("/:id", findOne)

router.post("", create)

router.put("/:id", update)

router.delete("/:id", deletePhase)

module.exports = router
