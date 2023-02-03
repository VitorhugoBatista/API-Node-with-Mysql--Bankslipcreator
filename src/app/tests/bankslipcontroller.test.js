/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import request from "supertest"
import app from '../../app.js'
import { Test } from "supertest"
import axios from "axios"



describe("HTTP response status code", () => {
  test("Should return 200 status code", async () => {
    const response = await axios.get("https://www.example.com");
    expect(response.status).toBe(200);
  });
});

describe("Root app", () => {
  test("Should return 200 status code", async () => {
    const response = request(app).get("/rest/bankslips/229efcaa-c776-4bef-831a-27420b57ca08");
    expect((await response).status).toBe(200);
  });
  
});