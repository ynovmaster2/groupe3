const express = require("express")
const { create } = require("../controller/document.controller")
const { findAll } = require("../controller/document.controller")
const { findOne } = require("../controller/document.controller")
const { update } = require("../controller/document.controller")
const { deleteDocument } = require("../controller/document.controller")

const router = express.Router()

router.get("", findAll)

router.get("/:documentId", findOne)

router.post("", create)

router.put("/:documentId", update)

router.delete("/:documentId", deleteDocument)

module.exports = router
