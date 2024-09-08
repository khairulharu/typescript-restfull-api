import supertest from "supertest";
import {web} from "../src/application/web"
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";


describe('POST /api/users', function () {

     afterEach(async () => {
          await UserTest.delete();
     });

     it('should reject register new user if request is invalid', async function (){
          const response = await supertest(web)
          .post("/api/users")
          .send({
               username: "",
               password: "",
               name: ""
          });

          logger.debug(response.body);
          expect(response.status).toBe(400);
          expect(response.body.errors).toBeDefined();
     });

     it('should register new user', async () => {
          const response = await supertest(web)
          .post("/api/users")
          .send({
               username: "test",
               password: "test",
               name: "test"
          });

          logger.debug(response.body);
          expect(response.status).toBe(200);
          expect(response.body.data.username).toBe("test");
          expect(response.body.data.name).toBe("test");
     });
});

describe('POST /api/users/login', () => {

     beforeEach(async () => {
          await UserTest.create();
     });

     afterEach(async () => {
          await UserTest.delete();
     });

     it('should get no error and succes login', async () => {
          const response = await supertest(web)
          .post("/api/users/login")
          .send({
               username: "test",
               password: "test"
          });

          logger.debug(response.body);
          expect(response.status).toBe(200);
          expect(response.body.data.username).toBe("test");
          expect(response.body.data.name).toBe("test");
          expect(response.body.data.token).toBeDefined();
     });

     it('should get erorr for checker in zod', async () => {
          const response = await supertest(web)
          .post("/api/users/login")
          .send({
               username: "",
               password: ""
          });

          logger.debug(response.body);
          expect(response.status).toBe(400);
          expect(response.body.errors).toBeDefined();
     });

     it('should get erorr beacuse password wrong', async () => {
          const response = await supertest(web)
          .post("/api/users/login")
          .send({
               username: "test",
               password: "testing"
          });

          logger.debug(response.body);
          expect(response.status).toBe(401);
          expect(response.body.errors).toBe("Username or Password is Wrong");
     });

     it('should get erorr because username not found', async () => {
          const response = await supertest(web)
          .post("/api/users/login")
          .send({
               username: "testing",
               password: "testing"
          });

          logger.debug(response.body);
          expect(response.status).toBe(401);
          expect(response.body.errors).toBe("Username or Password is Wrong");
     });
});

describe('GET /api/users/current', () => {

     beforeEach(async () => {
          await UserTest.create();
     });

     afterEach(async () => {
          await UserTest.delete();
     });


     it('should be able to get user', async () => {
          const response = await supertest(web)
          .get("/api/users/current")
          .set("X-API-TOKEN", "test")

          logger.debug(response);

          expect(response.status).toBe(200);
          expect(response.body.data.username).toBe("test");
          expect(response.body.data.name).toBe("test");
     });


     it('should reject get user if token is invalid', async () => {
          const response = await supertest(web)
          .get("/api/users/current")
          .set("X-API-TOKEN", "failed_test")

          logger.debug(response);

          expect(response.status).toBe(401);
          expect(response.body.errors).toBeDefined();
          expect(response.body.errors).toBe("Unauthorized");
     });
});