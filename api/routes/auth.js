/* istanbul ignore file */
// disable test -> external service

const express = require("express")
const fetch = require("node-fetch")
const oauth2 = require("../services/oauth2")

const router = express.Router()

// tmp
router.get("/", (req, res) => res.redirect(`${req.originalUrl}/github`))

// login github
router.get("/github", (req, res) => res.redirect(oauth2.code.getUri()))
router.get("/github/callback", (req, res) => {
	oauth2.code.getToken(req.originalUrl).then(
		(user) => {
			// console.log(user) //= > { accessToken: '...', tokenType: 'bearer', ... }

			// Refresh the current users access token.
			// user.refresh().then((updatedUser) => {
			// 	console.log(updatedUser !== user) //= > true
			// 	console.log(updatedUser.accessToken)
			// })

			// Sign API requests on behalf of the current user.
			// user.sign({
			// 	method: "get",
			// 	// url: "https://api.github.com/user",
			// })

			// fetch(
			// 	"https://api.github.com/user",
			// 	user.sign({
			// 		method: "get",
			// 		// url: "https://api.github.com/user",
			// 	})
			// )
			// 	.then((r) => r.json())
			// 	.then(console.log) // github user
			res.send(user.accessToken)
		},
		(e) => res.status(500).send({ error: e })
	)
})

router.get("/github/user/:token", (req, res) => {
	fetch("https://api.github.com/user", {
		headers: {
			Authorization: `Bearer ${req.params.token}`,
		},
	})
		.then((r) => r.json())
		.then((user) => res.status(200).send(user))
})

module.exports = router
