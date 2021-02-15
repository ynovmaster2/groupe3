const mongoose = require("mongoose")
const Document = require("../document").model

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

	it("create & save Document successfully", async () => {
		const data = {
			nom: "test",
			path: "http://path.ex",
		}
		const elm = new Document(data)
		const savedelm = await elm.save()
		// Object Id should be defined when successfully saved to MongoDB.
		expect(savedelm._id).toBeDefined()
		expect(savedelm.nom).toBe(data.nom)
		expect(savedelm.path).toBe(data.path)
	})
})
