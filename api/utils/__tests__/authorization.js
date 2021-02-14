const { authorization } = require("../authorization")
// mock require
const { formatRes } = require("../api")
const { getUser } = require("../../services/oauth2")

jest.mock("../api", () => ({ formatRes: jest.fn() }))
jest.mock("../../services/oauth2", () => ({
	getUser: jest.fn(
		(token) =>
			new Promise((resolve, reject) =>
				token === "error"
					? reject("error")
					: resolve(token === "nullusr" ? null : { role: "test" })
			)
	),
}))
//
/// /Promise.resolve({ role: "test" })

// authorization("req", "res", "next", "role")
// formatRes(res, null, 401, "utilisateur non authentifié")

describe("authorization", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	test("should 401 if token is not set", async () => {
		const next = jest.fn()
		await authorization({ query: {} }, "res", next, "role")

		expect(formatRes).toHaveBeenCalledWith(
			"res",
			null,
			401,
			"utilisateur non authentifié"
		)
	})
	test("should 500 if getUser is error", async () => {
		const next = jest.fn()
		await authorization({ query: { token: "error" } }, "res", next, "role")
		expect(getUser).toHaveBeenCalledWith("error")
		expect(formatRes).toHaveBeenCalledWith("res", null, 500, "error")
	})
	test("should 401 if getUser -> null", async () => {
		const next = jest.fn()
		await authorization({ query: { token: "nullusr" } }, "res", next, "role")
		expect(getUser).toHaveBeenCalledWith("nullusr")
		expect(formatRes).toHaveBeenCalledWith(
			"res",
			null,
			401,
			"utilisateur non authentifié"
		)
	})
	test("should 403 if getUser.role != role", async () => {
		const next = jest.fn()
		await authorization(
			{ query: { token: "valid token" } },
			"res",
			next,
			"role"
		)
		expect(getUser).toHaveBeenCalledWith("valid token")
		expect(formatRes).toHaveBeenCalledWith("res", null, 403, "accès refusé")
	})
	test("should next if getUser.role == role", async () => {
		const next = jest.fn()
		const req = { query: { token: "valid token" } } // set res.user
		await authorization(req, "res", next, "test")
		expect(getUser).toHaveBeenCalledWith("valid token")
		expect(next).toHaveBeenCalled()
		expect(req.user).toMatchObject({ role: "test" })
	})
})
