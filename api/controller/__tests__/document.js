const mongoose = require("mongoose")
const {
	create,
	findAll,
	findOne,
	update,
	deleteDocument,
} = require("../document.controller")

const { formatRes } = require("../../utils/api")

jest.mock("../../utils/api", () => ({
	formatRes: jest.fn((res) => res),
}))

describe("Model document", () => {
	// It's just so easy to connect to the MongoDB Memory Server
	// By using mongoose.connect
	beforeAll(async () => {
		await mongoose.connect(
			// eslint-disable-next-line no-underscore-dangle
			global.__MONGO_URI__,
			{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
			(err) => {
				if (err) {
					console.error(err)
					process.exit(1)
				}
			}
		)
	})
	afterAll(async () => mongoose.connection.close())
	beforeEach(() => jest.clearAllMocks())
	//

	it("findAll", async () => {
		await findAll("req", "res")
		expect(formatRes).toHaveBeenCalledTimes(1)
		expect(formatRes).toHaveBeenCalledWith("res", [])
	})

	describe("findOne", () => {
		it("not found", async () => {
			await findOne({ params: { id: "602a407f0334200a94b5abb6" } }, "res")
			expect(formatRes).toHaveBeenCalledTimes(1)
			expect(formatRes).toHaveBeenCalledWith(
				"res",
				null,
				404,
				"Document not found with id 602a407f0334200a94b5abb6"
			)
		})
		it("id error", async () => {
			await findOne({ params: { id: "error" }, body: {} }, "res")
			expect(formatRes).toHaveBeenCalledTimes(1)
			expect(formatRes).toHaveBeenCalledWith(
				"res",
				null,
				500,
				expect.anything()
			) // error -> mongo error
		})
	})

	describe("update", () => {
		it("not found", async () => {
			await update(
				{ params: { id: "602a407f0334200a94b5abb6" }, body: {} },
				"res"
			)
			expect(formatRes).toHaveBeenCalledTimes(1)
			expect(formatRes).toHaveBeenCalledWith(
				"res",
				null,
				404,
				"Document not found with id 602a407f0334200a94b5abb6"
			)
		})
		it("id error", async () => {
			await update({ params: { id: "error" }, body: {} }, "res")
			expect(formatRes).toHaveBeenCalledTimes(1)
			expect(formatRes).toHaveBeenCalledWith(
				"res",
				null,
				500,
				expect.anything()
			) // error -> mongo error
		})
	})

	describe("deleteDocument", () => {
		it("not found", async () => {
			await deleteDocument(
				{ params: { id: "602a407f0334200a94b5abb6" }, body: {} },
				"res"
			)
			expect(formatRes).toHaveBeenCalledTimes(1)
			expect(formatRes).toHaveBeenCalledWith(
				"res",
				null,
				404,
				"Document not found with id 602a407f0334200a94b5abb6"
			)
		})
		it("id error", async () => {
			await deleteDocument({ params: { id: "error" }, body: {} }, "res")
			expect(formatRes).toHaveBeenCalledTimes(1)
			expect(formatRes).toHaveBeenCalledWith(
				"res",
				null,
				500,
				expect.anything()
			) // error -> mongo error
		})
	})
})
