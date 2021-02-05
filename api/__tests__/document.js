const request = require("supertest")
const app = require("../app")

describe("GET /document", () => {
	test("It responds with an array of document", async () => {
		const response = await request(app).get("/document");
		expect(response.body).toMatchObject([{"success":true,
		"code":200,
		"message":"Ok",
		"data": [{nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"}]	
	}])
		expect(response.statusCode).toBe(200);
	});
  });


  describe('Post /document', () => {
	it('should create a new document', async () => {
	  const res = await request(app)
		.post('/document')
		.send([{"success":true,
		"code":201,
		"message":"document created",
		"data": [{nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"}]	
	  }])
	  expect(res.statusCode).toEqual(201)
	})
  })

  describe('PUT /document', () => {
	it('should updated a new document', async () => {
	  const res = await request(app)
		.put('/document')
		.send([{"success":true,
		"code":201,
		"message":"document updated",
		"data": [{nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"}]
	  }])
	  expect(res.statusCode).toEqual(201)
	})
  })

  describe('DELETE /document', () => {
	it('should deleted a new document', async () => {
	  const res = await request(app)
		.delete('/document')
		.send([{"success":true,
		"code":201,
		"message":"document deleted",
		"data": {id : "19189191919"}	
	  }])
	  expect(res.statusCode).toEqual(200)
	})
  })