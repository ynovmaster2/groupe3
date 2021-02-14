/* eslint-disable no-bitwise */
const { hasrole, authorization, role } = require("../authorization")
// mock require
const { formatRes } = require("../api")
const { getUser } = require("../../services/oauth2")

jest.mock("../api", () => ({ formatRes: jest.fn() }))
jest.mock("../../services/oauth2", () => ({
	getUser: jest.fn(
		(token) =>
			new Promise((resolve, reject) =>
				token === "error"
					? // eslint-disable-next-line prefer-promise-reject-errors
					  reject("error")
					: resolve(token === "nullusr" ? null : { role: "user" })
			)
	),
}))

test("hasrole", () => {
	expect(hasrole("user", role.user)).toBeTruthy()
	expect(hasrole("admin", role.admin)).toBeTruthy()
	//
	expect(hasrole("user", role.admin | role.user)).toBeTruthy()
	//
	expect(hasrole("admin", role.user)).toBeFalsy()
	expect(hasrole("user", role.admin)).toBeFalsy()
})

// authorization("req", "res", "next", "role")
// formatRes(res, null, 401, "utilisateur non authentifié")
describe("authorization", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	test("should 401 if token is not set", async () => {
		const next = jest.fn()
		await authorization({ query: {} }, "res", next, role.user)

		expect(formatRes).toHaveBeenCalledWith(
			"res",
			null,
			401,
			"utilisateur non authentifié"
		)
	})
	test("should 500 if getUser is error", async () => {
		const next = jest.fn()
		await authorization({ query: { token: "error" } }, "res", next, role.user)
		expect(getUser).toHaveBeenCalledWith("error")
		expect(formatRes).toHaveBeenCalledWith("res", null, 500, "error")
	})
	test("should 401 if getUser -> null", async () => {
		const next = jest.fn()
		await authorization({ query: { token: "nullusr" } }, "res", next, role.user)
		expect(getUser).toHaveBeenCalledWith("nullusr")
		expect(formatRes).toHaveBeenCalledWith(
			"res",
			null,
			401,
			"utilisateur non authentifié"
		)
	})
	test("should 403 if getUser.role not in roles", async () => {
		const next = jest.fn()
		await authorization(
			{ query: { token: "valid token" } },
			"res",
			next,
			role.admin
		)
		expect(getUser).toHaveBeenCalledWith("valid token")
		expect(formatRes).toHaveBeenCalledWith("res", null, 403, "accès refusé")
	})
	test("should next if getUser && role = null", async () => {
		const next = jest.fn()
		const req = { query: { token: "valid token" } } // set res.user
		await authorization(req, "res", next)
		expect(getUser).toHaveBeenCalledWith("valid token")
		expect(next).toHaveBeenCalled()
		expect(req.user).toMatchObject({ role: "user" })
	})
	test("should next if getUser.role in role", async () => {
		const next = jest.fn()
		const req = { query: { token: "valid token" } } // set res.user
		await authorization(req, "res", next, role.user)
		expect(getUser).toHaveBeenCalledWith("valid token")
		expect(next).toHaveBeenCalled()
		expect(req.user).toMatchObject({ role: "user" })
	})
	test("should next if getUser.role in role[]", async () => {
		const next = jest.fn()
		const req = { query: { token: "valid token" } } // set res.user
		await authorization(req, "res", next, role.admin | role.user)
		expect(getUser).toHaveBeenCalledWith("valid token")
		expect(next).toHaveBeenCalled()
		expect(req.user).toMatchObject({ role: "user" })
	})
})
