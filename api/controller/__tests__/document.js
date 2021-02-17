/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose")
const Document = require("../../models/document").model
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

let initialData = [
	{
		_id: "602a407f0334200a94b5abb1",
		nom: "nom1",
		path: "path1",
		createdAt: new Date("2021-02-15T11:31:20.009Z"),
		updatedAt: new Date("2021-02-15T11:31:20.009Z"),
	},
	{
		_id: "602a407f0334200a94b5abb2",
		nom: "nom2",
		path: "path",
		createdAt: new Date("2021-02-15T11:31:20.009Z"),
		updatedAt: new Date("2021-02-15T11:31:20.009Z"),
	},
]

describe("Model document", () => {
	// It's just so easy to connect to the MongoDB Memory Server
	// By using mongoose.connect
	beforeAll(async () => {
		await mongoose.connect(
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
	beforeEach(async () => {
		jest.clearAllMocks()
		await Document.deleteMany()
		const elms = await await Document.create(initialData)
		initialData = elms.map((r) => r.toJSON())
	})

	//
	describe("create", () => {
		it("doc", async () => {
			const doc = initialData[0]
			delete doc._id
			await create({ body: doc }, "res")
			expect(formatRes).toHaveBeenCalledTimes(1)
			expect(formatRes).toHaveBeenCalledWith("res", expect.anything())
			expect(formatRes.mock.calls[0][1]).toMatchObject(doc)
		})
		it("error", async () => {
			await create({}, "res")
			expect(formatRes).toHaveBeenCalledTimes(1)
			expect(formatRes).toHaveBeenCalledWith(
				"res",
				null,
				500,
				expect.anything()
			)
		})
	})
	it("findAll", async () => {
		await findAll("req", "res")
		expect(formatRes).toHaveBeenCalledTimes(1)
		expect(formatRes).toHaveBeenCalledWith("res", expect.anything())
		expect(formatRes.mock.calls[0][1]).toMatchObject(initialData)
	})

	describe("findOne", () => {
		it("doc", async () => {
			await findOne({ params: { id: initialData[0]._id } }, "res")
			expect(formatRes).toHaveBeenCalledTimes(1)
			expect(formatRes).toHaveBeenCalledWith("res", expect.anything())
			expect(formatRes.mock.calls[0][1]).toMatchObject(initialData[0])
		})
		it("not found", async () => {
			await findOne({ params: { id: "000a407f0334200a94b5abb6" } }, "res")
			expect(formatRes).toHaveBeenCalledTimes(1)
			expect(formatRes).toHaveBeenCalledWith(
				"res",
				null,
				404,
				"Document not found with id 000a407f0334200a94b5abb6"
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
		it("doc", async () => {
			await update(
				{ params: { id: initialData[0]._id }, body: { nom: "test" } },
				"res"
			)
			delete initialData[0].updatedAt // -> run date
			expect(formatRes).toHaveBeenCalledTimes(1)
			expect(formatRes).toHaveBeenCalledWith("res", expect.anything())
			expect(formatRes.mock.calls[0][1]).toMatchObject({
				...initialData[0],
				nom: "test",
			})
		})
		it("not found", async () => {
			await update(
				{ params: { id: "000a407f0334200a94b5abb6" }, body: {} },
				"res"
			)
			expect(formatRes).toHaveBeenCalledTimes(1)
			expect(formatRes).toHaveBeenCalledWith(
				"res",
				null,
				404,
				"Document not found with id 000a407f0334200a94b5abb6"
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
		it("doc", async () => {
			await deleteDocument(
				{ params: { id: initialData[0]._id }, body: { nom: "test" } },
				"res"
			)
			expect(formatRes).toHaveBeenCalledTimes(1)
			expect(formatRes).toHaveBeenCalledWith(
				"res",
				"Document deleted successfully!"
			)
		})
		it("not found", async () => {
			await deleteDocument(
				{ params: { id: "000a407f0334200a94b5abb6" }, body: {} },
				"res"
			)
			expect(formatRes).toHaveBeenCalledTimes(1)
			expect(formatRes).toHaveBeenCalledWith(
				"res",
				null,
				404,
				"Document not found with id 000a407f0334200a94b5abb6"
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
