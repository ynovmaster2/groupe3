const express = require("express")
const { getUri, callback, user } = require("../controller/auth")

const router = express.Router()

// only github for now
router.get("/", (req, res) => res.redirect(`${req.originalUrl}/github`))

// login github
router.get("/github", getUri)

router.get("/github/callback", callback)

router.get("/github/user/:token", user)

module.exports = router
