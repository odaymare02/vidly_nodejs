const request = require("supertest");
const mongoose = require("mongoose");
const { Genres } = require("../../models/genresModel");
const User = require("../../models/user");
let server;
describe("/api/genres", () => {
  beforeEach(() => {
    //jest call this fun before each test inside that test
    server = require("../../index");
  });
  afterEach(async () => {
    await server.close();
    await Genres.deleteMany({});
  });
  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genres.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);

      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });
  describe("GET/:id", () => {
    //this call test sweet
    id = new mongoose.Types.ObjectId();
    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get(`/api/genres/4`);
      expect(res.status).toBe(404);
    });
    it("should return 404 if no genre with the given id exist", async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/genres/${id}`);
      expect(res.status).toBe(404);
    });
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genres({ name: "genre1" });
      await genre.save();
      const res = await request(server).get(`/api/genres/${genre._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });
  });
  describe("POST/", () => {
    let token;
    let name;
    //rather for repate the request for all testCase we can do this
    //? define the happy path, and then each test we change one parameter that clearly aligns with the name of the test
    const exec = async () => {
      return await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name });
    };
    beforeEach(() => {
      token = new User().generateToken();
      name = "genre1";
    });
    it("should return 401 if client not logged in", async () => {
      // const res=await request(server)
      // .post('/api/genres')
      // .send({name:'genre1'});
      token = "";
      res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is less than 5 characters", async () => {
      // const token=new User().generateToken();
      // const res=await request(server)
      // .post('/api/genres')
      // .set('x-auth-token',token)
      // .send({name:'1234'});
      name = "1324";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if genre is more than 50 characters", async () => {
      // const token=new User().generateToken();
      // const testArray=new Array(52).join('a');
      // const res=await request(server)
      // .post('/api/genres')
      // .set('x-auth-token',token)
      // .send({name:testArray});
      name = new Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should save the genre if it is valid", async () => {
      // const token=new User().generateToken();
      // const res=await request(server)
      // .post('/api/genres')
      // .set('x-auth-token',token)
      // .send({name:'genre1'});
      const res = await exec();
      const genre = await Genres.find({ name: "genre1" });
      expect(genre).not.toBeNull();
    });
    it("should return the genre if it is valid", async () => {
      // const token=new User().generateToken();
      // const res=await request(server)
      // .post('/api/genres')
      // .set('x-auth-token',token)
      // .send({name:'genre1'});
      const res = await exec();
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });
  describe("PUT /", () => {
    let token;
    let name;
    let genre;
    let id;
    const exec = async () => {
      return await request(server)
        .put(`/api/genres/${id}`)
        .set("x-auth-token", token)
        .send({ name });
    };
    beforeEach(async () => {
      token = new User().generateToken();
      name = "genre1";
      genre = new Genres({ name });
      await genre.save();
      id = genre._id;
    });
    it("should return 404 if invalid objectID", async () => {
      id = 1;
      const res = await exec();
      expect(res.status).toBe(404);
    });
    it("should return 401 if not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });
    it("should return 400 if genre is less than 5 characters", async () => {
      name = "1324";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if genre is more than 50 characters", async () => {
      name = new Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if no genre with this ID", async () => {
      id = new mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(404);
    });
    it("should update the genre if input is valid", async () => {
      name = "odaymare";
      const res = await exec();
      genre = await Genres.findById(id);
      expect(genre.name).toBe("odaymare");
    });
    it("should return the updated genre in body", async () => {
      name = "odaymare";
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "odaymare");
    });
  });
  describe("DELETE /", () => {
    let token;
    let genre;
    let id;

    const exec = async () => {
      return await request(server)
        .delete(`/api/genres/${id}`)
        .set("x-auth-token", token);
    };

    beforeEach(async () => {
      genre = new Genres({ name: "genre1" });
      await genre.save();
      id = genre._id;
      token = new User({ isAdmin: true }).generateToken();
    });
    it("should return 404 if invalid objectID", async () => {
      id = 1;
      const res = await exec();
      expect(res.status).toBe(404);
    });
    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 403 if user is not admin", async () => {
      token = new User({ isAdmin: false }).generateToken();
      const res = await exec();
      expect(res.status).toBe(403);
    });
    it("should return 404 if no genre with the given ID exists", async () => {
      id = new mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should delete the genre if input is valid and user is admin", async () => {
      const res = await exec();
      const genreInDb = await Genres.findById(id);
      expect(genreInDb).toBeNull();
    });

    it("should return the deleted genre in the response body", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", genre.name);
    });
  });
});
