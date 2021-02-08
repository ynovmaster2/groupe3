const request = require("supertest")
const mongoose = require("mongoose")
const app = require("../app")

afterAll((done) => {
	mongoose.connection.close(done)
})

describe("Test the root path", () => {
	test("It should response the GET method", (done) => {
		request(app)
			.get("/")
			.then((response) => {
				expect(response.statusCode).toBe(200)
				expect(response.text).toBe("ok\n")
				done()
			})
	})
})
