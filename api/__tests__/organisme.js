const request = require("supertest")
const app = require("../app")

describe("GET /organisme", () => {
	test("It responds with an array of organisme", async () => {
		const response = await request(app).get("/organisme");
		expect(response.body).toMatchObject([{"success":true,
		"code":200,
		"message":"Ok",
		"data": [{nom: "Grand groupe", createdAt:"1612606573", updatedAt:"1612606573"}]	
	}])
		expect(response.statusCode).toBe(200);
	});
  });


  describe('Post /organisme', () => {
	it('should create a new organisme', async () => {
	  const res = await request(app)
		.post('/organisme')
		.send([{"success":true,
		"code":201,
		"message":"organisme created",
		"data": [{nom: "Grand groupe", createdAt:"1612606573", updatedAt:"1612606573"}]	
	  }])
	  expect(res.statusCode).toEqual(201)
	})
  })

  describe('PUT /organisme', () => {
	it('should updated a new organisme', async () => {
	  const res = await request(app)
		.put('/organisme')
		.send([{"success":true,
		"code":201,
		"message":"organisme updated",
		"data": [{nom: "Grand groupe", createdAt:"1612606573", updatedAt:"1612606573"}]
	  }])
	  expect(res.statusCode).toEqual(201)
	})
  })

  describe('DELETE /organisme', () => {
	it('should deleted a new organisme', async () => {
	  const res = await request(app)
		.delete('/organisme')
		.send([{"success":true,
		"code":201,
		"message":"organisme deleted",
		"data": {id : "19189191919"}
	  }])
	  expect(res.statusCode).toEqual(200)
	})
  })