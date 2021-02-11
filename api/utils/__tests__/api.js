const { formatRes } = require("../api")

describe("api response format", () => {
	it("data", () => {
		const send = jest.fn()
		const status = jest.fn(() => ({
			send,
		}))
		formatRes({ status }, "data")
		expect(send).toHaveBeenCalledWith({
			success: true,
			code: 200,
			message: "Ok",
			data: "data",
		})
		expect(status).toHaveBeenCalledWith(200)
	})
	it("data res code", () => {
		const send = jest.fn()
		const status = jest.fn(() => ({
			send,
		}))
		formatRes({ status }, "data", 300)
		expect(send).toHaveBeenCalledWith({
			success: true,
			code: 300,
			message: "Ok",
			data: "data",
		})
		expect(status).toHaveBeenCalledWith(300)
	})
	it("eroor", () => {
		const send = jest.fn()
		const status = jest.fn(() => ({
			send,
		}))
		formatRes({ status }, null, 500, { error: "test" })
		expect(send).toHaveBeenCalledWith({
			success: false,
			code: 500,
			message: "Ok",
			error: { error: "test" },
		})
		expect(status).toHaveBeenCalledWith(500)
	})
})

// (res, data, code = 200, error = null)
