const request = require("supertest")
const app = require("../app")

// describe("Test the root path", () => {
// 	test("It should response the GET method", (done) => {
// 		request(app)
// 			.get("/")
// 			.then((response) => {
// 				expect(response.statusCode).toBe(200)
// 				expect(response.text).toBe("ok\n")
// 				done()
// 			})
// 	})
// })


describe("GET /user", () => {
	test("It responds with an array of user", async () => {
		const response = await request(app).get("/user");
		expect(response.body).toMatchObject([{"success":true,
		"code":200,
		"message":"Ok",
		"data": [{id: "toto",email:"toto@toto.fr",role:"chef",tel:"09090909",createdAt:"1612606573",updatedAt:"1612606573"}]	
		}])
		expect(response.statusCode).toBe(200);
	});
  });

describe('Post /user', () => {
	it('should create a new user', async () => {
	  const res = await request(app)
		.post('/user')
		.send([{"success":true,
		"code":201,
		"message":"User created",
		"data": {id: "toto",email:"toto@toto.fr",role:"chef",tel:"09090909",createdAt:"1612606573",updatedAt:"1612606573"}	
		}])
	  expect(res.statusCode).toEqual(201)
	})
  })

  describe('PUT /user', () => {
	it('should update a new user', async () => {
	  const res = await request(app)
		.put('/user')
		.send([{"success":true,
		"code":201,
		"message":"User updated",
		"data": {id: "toto",email:"toto@toto.fr",role:"chef",tel:"09090909",createdAt:"1612606573",updatedAt:"1612606573"}	
		}])
	  expect(res.statusCode).toEqual(201)
	})
  })

  describe('DELETE /user', () => {
	it('should delete a new user', async () => {
	  const res = await request(app)
		.delete('/user')
		.send([{"success":true,
		"code":200,
		"message":"User deleted",
		"data": {id:"101010101010"}	
		}])
	  expect(res.statusCode).toEqual(200)
	})
  })


 
  