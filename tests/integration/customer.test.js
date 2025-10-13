const request=require('supertest')
const Customer=require('../../models/customerModel');
const mongoose=require('mongoose');
const User=require('../../models/user')
let server;
describe('/api/customer', () => {
    beforeEach(()=>{
        server=require('../../index');
    });
    afterEach(async () => {
    await server.close();
    await Customer.deleteMany({});
  });
  describe('GET/',()=>{
    it('should return all customer',async()=>{
        await Customer.collection.insertMany([
            {name:'odaymare',phone:'0569619602'},
            {name:'odaysami',phone:'0569619851'}
        ]);
        const res=await request(server).get('/api/customers');
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(2);
        expect(res.body.data.some((c)=>c.name==='odaymare')).toBeTruthy();
        expect(res.body.data.some((c)=>c.name==='odaysami')).toBeTruthy();
    });
  });
  describe('GET/:id', () => {
    id=new mongoose.Types.ObjectId();
    it('should return 404 if invalid object ID is passed',async()=>{
        const res = await request(server).get(`/api/customers/4`);
        expect(res.status).toBe(404);
    });
    it('should return 404 if no customer with the given id exist',async()=>{
         const res = await request(server).get(`/api/customers/${id}`);
        expect(res.status).toBe(404);
    });
    it('should return customer if valid id is passed',async()=>{
        const cutomer=new Customer({name:'odaymare',phone:'056969631'});
        await cutomer.save();
        const res=await request(server).get(`/api/customers/${cutomer._id}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("name", cutomer.name);
    });
  })
  
})
