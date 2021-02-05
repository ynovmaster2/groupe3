const request = require("supertest")
const app = require("../app")

describe("GET /projet", () => {
	test("It responds with an array of user", async () => {
		const response = await request(app).get("/projet");
		expect(response.body).toMatchObject([{"success":true,
		"code":200,
		"message":"Ok",
		"data": [{nom: "toto",code:"1818822",describe:"first projetc",
		chef: {id: "toto",email:"toto@toto.fr",role:"chef",tel:"09090909",createdAt:"1612606573",updatedAt:"1612606573"},
		equipe: [
			{id: "tata",email:"tata@tata.fr",role:"user",tel:"9897655",createdAt:"1612606573",updatedAt:"1612606573"},
			{id: "titi",email:"titi@titi.fr",role:"admin",tel:"9977777",createdAt:"1612606573",updatedAt:"1612606573"},
			],
		documentation: {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
		oragnisme: {nom: "Grand groupe", createdAt:"1612606573", updatedAt:"1612606573"},
		phase: [{
			code: "9865433", libelle:"UBUYGYGY",description: "test", PourcentageMontant:"10%", Paiement: true, facturation: true, realisation: true,
			documentation:  {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
			livrable: {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
			employes: [
				{id: "tyson",email:"tyson@tyson.fr",role:"user",tel:"66789000000",createdAt:"1612606573",updatedAt:"1612606573"},
				],
			createdAt:"1612606573",updatedAt:"1612606573"
			}],
		}]	
	}])
		expect(response.statusCode).toBe(200);
	});
  });


  describe('Post /projet', () => {
	it('should create a new projet', async () => {
	  const res = await request(app)
		.post('/projet')
		.send([{"success":true,
		"code":201,
		"message":"Projet created",
		"data": [{nom: "toto",code:"1818822",describe:"first projetc",
		chef: {id: "toto",email:"toto@toto.fr",role:"chef",tel:"09090909",createdAt:"1612606573",updatedAt:"1612606573"},
		equipe: [
			{id: "tata",email:"tata@tata.fr",role:"user",tel:"9897655",createdAt:"1612606573",updatedAt:"1612606573"},
			{id: "titi",email:"titi@titi.fr",role:"admin",tel:"9977777",createdAt:"1612606573",updatedAt:"1612606573"},
			],
		documentation: {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
		oragnisme: {nom: "Grand groupe", createdAt:"1612606573", updatedAt:"1612606573"},
		phase: [{
			code: "9865433", libelle:"UBUYGYGY",description: "test", PourcentageMontant:"10%", Paiement: true, facturation: true, realisation: true,
			documentation:  {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
			livrable: {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
			employes: [
				{id: "tyson",email:"tyson@tyson.fr",role:"user",tel:"66789000000",createdAt:"1612606573",updatedAt:"1612606573"},
				],
			createdAt:"1612606573",updatedAt:"1612606573"
			}],
		}]	
	  }])
	  expect(res.statusCode).toEqual(201)
	})
  })

  describe('PUT /projet', () => {
	it('should updated a new projet', async () => {
	  const res = await request(app)
		.put('/projet')
		.send([{"success":true,
		"code":201,
		"message":"Projet updated",
		"data": [{nom: "toto",code:"1818822",describe:"first projetc",
		chef: {id: "toto",email:"toto@toto.fr",role:"chef",tel:"09090909",createdAt:"1612606573",updatedAt:"1612606573"},
		equipe: [
			{id: "tata",email:"tata@tata.fr",role:"user",tel:"9897655",createdAt:"1612606573",updatedAt:"1612606573"},
			{id: "titi",email:"titi@titi.fr",role:"admin",tel:"9977777",createdAt:"1612606573",updatedAt:"1612606573"},
			],
		documentation: {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
		oragnisme: {nom: "Grand groupe", createdAt:"1612606573", updatedAt:"1612606573"},
		phase: [{
			code: "9865433", libelle:"UBUYGYGY",description: "test", PourcentageMontant:"10%", Paiement: true, facturation: true, realisation: true,
			documentation:  {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
			livrable: {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
			employes: [
				{id: "tyson",email:"tyson@tyson.fr",role:"user",tel:"66789000000",createdAt:"1612606573",updatedAt:"1612606573"},
				],
			createdAt:"1612606573",updatedAt:"1612606573"
			}],
		}]	
	  }])
	  expect(res.statusCode).toEqual(201)
	})
  })

  describe('DELETE /projet', () => {
	it('should deleted a new projet', async () => {
	  const res = await request(app)
		.delete('/projet')
		.send([{"success":true,
		"code":201,
		"message":"Projet deleted",
		"data": {id : "19189191919"}	
	  }])
	  expect(res.statusCode).toEqual(200)
	})
  })