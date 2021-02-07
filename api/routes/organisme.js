const express = require("express")
const { create } = require("../controller/organisme.controller")
const { findAll } = require("../controller/organisme.controller")
const { findOne } = require("../controller/organisme.controller")
const { update } = require("../controller/organisme.controller")
const { deleteOrganisme } = require("../controller/organisme.controller")

const router = express.Router()

router.get("/:organismetId", findOne)

router.get("", findAll)

router.post("", create)

router.put("/:organismetId", update)

router.delete("/:organismetId", deleteOrganisme)

module.exports = router
