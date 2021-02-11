const ClientOAuth2 = require("client-oauth2")

const config = {
	clientId: process.env.CONFIG_OAUTH2_CLIENT_ID,
	clientSecret: process.env.CONFIG_OAUTH2_CLIENT_SECRET,
	accessTokenUri: process.env.CONFIG_OAUTH2_ACCESS_TOKEN_URI,
	authorizationUri: process.env.CONFIG_OAUTH2_AUTHORIZATION_URI,
	redirectUri: process.env.CONFIG_OAUTH2_REDIRECT_URI,
	scopes: [],
}

module.exports = new ClientOAuth2(config)
