/* istanbul ignore file */
// disable test -> external service
const ClientOAuth2 = require("client-oauth2")
const fetch = require("node-fetch")
const User = require("../models/user").model

const config = {
	clientId: process.env.CONFIG_OAUTH2_CLIENT_ID,
	clientSecret: process.env.CONFIG_OAUTH2_CLIENT_SECRET,
	accessTokenUri: process.env.CONFIG_OAUTH2_ACCESS_TOKEN_URI,
	authorizationUri: process.env.CONFIG_OAUTH2_AUTHORIZATION_URI,
	redirectUri: process.env.CONFIG_OAUTH2_REDIRECT_URI,
	scopes: [],
}
const oauth2 = new ClientOAuth2(config)

// user model from github user
const extractUserID = (user) => ({
	oauth: { github: { id: user.id } },
})
const extractUser = (user) => ({
	username: user.login,
	email: user.email,
	...extractUserID(user),
})

// code -> token & bdd add user
const callback = (originalUrl) =>
	new Promise((resolve, reject) => {
		oauth2.code.getToken(originalUrl).then((user) => {
			// console.log(user) //= > { accessToken: '...', tokenType: 'bearer', ... }
			// Refresh the current users access token.
			// user.refresh().then((updatedUser) => {
			// 	console.log(updatedUser !== user) //= > true
			// 	console.log(updatedUser.accessToken)
			// })

			// fetch("https://api.github.com/user", user.sign({ method: "get" })).then((r) => r.json()) // -> github user

			// bdd user
			fetch("https://api.github.com/user", user.sign({ method: "get" }))
				.then((r) => r.json())
				.then((r) => {
					const insert = extractUser(r)
					new User(insert).save().then(
						() => resolve(user.accessToken),
						(err) => {
							// is in bdd (model unique)
							if (err.code === 11000) resolve(user.accessToken)
							else reject(err)
						}
					)
				})
		}, reject)
	})

const getUser = (token) =>
	new Promise((resolve, reject) => {
		fetch("https://api.github.com/user", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((r) => r.json())
			.then((user) => {
				User.findOne(extractUserID(user)).then(resolve, reject)
			})
	})
const getUri = () => oauth2.code.getUri()

module.exports = { getUri, callback, getUser }
