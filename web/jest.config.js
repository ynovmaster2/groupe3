// https://github.com/vercel/next.js/blob/canary/examples/with-jest/jest.config.js
module.exports = {
	collectCoverage: true,
	collectCoverageFrom: [
		"**/*.{js,jsx,ts,tsx}",
		"!**/*.d.ts",
		"!**/.next/**",
		"!**/node_modules/**",
		"!**/config/jest/**",
		"!**/coverage/**",
		"!**/babel.config.js",
		"!**/jest.config.js",
	],
	testPathIgnorePatterns: ["/node_modules/", "/.next/"],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
		"^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
	},
	transformIgnorePatterns: [
		"/node_modules/",
		"^.+\\.module\\.(css|sass|scss)$",
	],
	moduleNameMapper: {
		"^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
	},
}
