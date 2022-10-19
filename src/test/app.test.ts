import request from 'supertest';
import app from '../app';

it("first test", async()=> {
    console.log("first test");
    const response = await request(app).get("/users");
    console.log(response.body);

})