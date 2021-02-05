const request = require("supertest")
const app = require("../app")

describe("GET /phase", () => {
	test("It responds with an array of phase", async () => {
		const response = await request(app).get("/phase");
		expect(response.body).toMatchObject([{"success":true,
		"code":200,
		"message":"Ok",
		"data": [{
			code: "9865433", libelle:"UBUYGYGY",description: "test", PourcentageMontant:"10%", Paiement: true, facturation: true, realisation: true,
			documentation:  {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
			livrable: {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
			employes: [
				{id: "tyson",email:"tyson@tyson.fr",role:"user",tel:"66789000000",createdAt:"1612606573",updatedAt:"1612606573"},
				],
			createdAt:"1612606573",updatedAt:"1612606573"
			}]	
	}])
		expect(response.statusCode).toBe(200);
	});
  });


  describe('Post /phase', () => {
	it('should create a new projet', async () => {
	  const res = await request(app)
		.post('/phase')
		.send([{"success":true,
		"code":201,
		"message":"phase created",
		"data": [{
			code: "9865433", libelle:"UBUYGYGY",description: "test", PourcentageMontant:"10%", Paiement: true, facturation: true, realisation: true,
			documentation:  {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
			livrable: {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
			employes: [
				{id: "tyson",email:"tyson@tyson.fr",role:"user",tel:"66789000000",createdAt:"1612606573",updatedAt:"1612606573"},
				],
			createdAt:"1612606573",updatedAt:"1612606573"
			}]	
	  }])
	  expect(res.statusCode).toEqual(201)
	})
  })

  describe('PUT /phase', () => {
	it('should updated a new phase', async () => {
	  const res = await request(app)
		.put('/phase')
		.send([{"success":true,
		"code":201,
		"message":"Phase updated",
		"data": [{
			code: "9865433", libelle:"UBUYGYGY",description: "test", PourcentageMontant:"10%", Paiement: true, facturation: true, realisation: true,
			documentation:  {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
			livrable: {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
			employes: [
				{id: "tyson",email:"tyson@tyson.fr",role:"user",tel:"66789000000",createdAt:"1612606573",updatedAt:"1612606573"},
				],
			createdAt:"1612606573",updatedAt:"1612606573"
			}]
	  }])
	  expect(res.statusCode).toEqual(201)
	})
  })

  describe('DELETE /phase', () => {
	it('should deleted a new phase', async () => {
	  const res = await request(app)
		.delete('/phase')
		.send([{"success":true,
		"code":201,
		"message":"phase deleted",
		"data": {id : "19189191919"}	
	  }])
	  expect(res.statusCode).toEqual(200)
	})
  })