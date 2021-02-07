const express = require("express")
const { create } = require("../controller/organisme.controller")
const { findAll } = require("../controller/organisme.controller")
const { findOne } = require("../controller/organisme.controller")
const { update } = require("../controller/organisme.controller")
// const { deleteOrganisme } = require("../controller/organisme.controller")

const router = express.Router()

router.get("/:id", findOne)

router.get("", findAll)

router.post("", create)

router.put("/:id", update)

// router.delete("/:id", deleteOrganisme)

module.exports = router
