import supertest from "supertest";
import { web } from "../src/application/web";
import { ContactTest, UserTest } from "./test-util";
import { logger } from "../src/application/logging";

describe("POST /api/contacts", () => {
     beforeEach(async () => {
          await UserTest.create();
     });

     afterEach(async () => {
          await ContactTest.deleteAll();
          await UserTest.delete();
     });

     it("should create new contact", async () => {
          const response = await supertest(web)
               .post("/api/contacts")
               .set("X-API-TOKEN", "test")
               .send({
                    first_name: "Khairul",
                    last_name: "aswad",
                    phone: "0893384711",
                    email: "khairul@example.com",
               });

          logger.debug(response);

          expect(response.status).toBe(200);
          expect(response.body.data.id).toBeDefined();
          expect(response.body.data.first_name).toBe("Khairul");
          expect(response.body.data.last_name).toBe("aswad");
          expect(response.body.data.email).toBe("khairul@example.com");
          expect(response.body.data.phone).toBe("0893384711");
     });

     it("should still be able to create contact if just lastname are fill", async () => {
          const response = await supertest(web)
               .post("/api/contacts")
               .set("X-API-TOKEN", "test")
               .send({
                    first_name: "Khairul",
               });

          logger.debug(response);

          expect(response.status).toBe(200);
          expect(response.body.data.id).toBeDefined();
          expect(response.body.data.first_name).toBe("Khairul");
     });

     it("should can still create contact if just one or two field is fill", async () => {
          const response = await supertest(web)
               .post("/api/contacts")
               .set("X-API-TOKEN", "test")
               .send({
                    first_name: "khairul",
                    phone: "089664522",
               });

          logger.debug(response);

          expect(response.status).toBe(200);
          expect(response.body.data.first_name).toBe("khairul");
          expect(response.body.data.phone).toBe("089664522");
     });

     it("should still be able to create contact if just firstname are fill", async () => {
          const response = await supertest(web)
               .post("/api/contacts")
               .set("X-API-TOKEN", "test")
               .send({
                    first_name: "Khairul",
               });

          logger.debug(response);

          expect(response.status).toBe(200);
          expect(response.body.data.id).toBeDefined();
          expect(response.body.data.first_name).toBe("Khairul");
     });

     it("should reject if email is not a email string convention", async () => {
          const response = await supertest(web)
               .post("/api/contacts")
               .set("X-API-TOKEN", "test")
               .send({
                    first_name: "Khairul",
                    last_name: "aswad",
                    phone: "0893384711",
                    email: "khairul",
               });

          logger.debug(response);

          expect(response.status).toBe(400);
          expect(response.body.errors).toBeDefined();
     });

     it("should decline if body is not fill or just string with no body", async () => {
          const response = await supertest(web)
               .post("/api/contacts")
               .set("X-API-TOKEN", "test")
               .send({
                    first_name: "",
                    last_name: "",
                    phone: "",
                    email: "",
               });

          logger.debug(response);

          expect(response.status).toBe(400);
          expect(response.body.errors).toBeDefined();
     });
});

describe("GET /api/contacts/:contactId", () => {
     beforeEach(async () => {
          await UserTest.create();
          await ContactTest.create();
     });

     afterEach(async () => {
          await ContactTest.deleteAll();
          await UserTest.delete();
     });

     it("should be able get contact", async () => {
          const contact = await ContactTest.get();
          const response = await supertest(web)
               .get(`/api/contacts/${contact.id}`)
               .set("X-API-TOKEN", "test");

          logger.debug(response.body);

          expect(response.status).toBe(200);
          expect(response.body.data.id).toBeDefined();
          expect(response.body.data.first_name).toBe(contact.first_name);
          expect(response.body.data.last_name).toBe(contact.last_name);
          expect(response.body.data.email).toBe(contact.email);
          expect(response.body.data.phone).toBe(contact.phone);
          expect("test").toBe(contact.username);
     });

     it("should reject get contact if contact not found", async () => {
          const contact = await ContactTest.get();
          const response = await supertest(web)
               .get(`/api/contacts/${contact.id + 1}`)
               .set("X-API-TOKEN", "test");

          logger.debug(response.body);

          expect(response.status).toBe(404);
          expect(response.body.errors).toBeDefined();
     });
});

describe('PUT /api/contacts/:contactId', function () {

     beforeEach(async () => {
          await UserTest.create();
          await ContactTest.create();
     });

     afterEach(async () => {
          await ContactTest.deleteAll();
          await UserTest.delete();
     });

     it('should be able to update contact', async function () {
          const contact = await ContactTest.get();

          const response = await supertest(web)
          .put(`/api/contacts/${contact.id}`)
          .set("X-API-TOKEN", "test")
          .send({
               first_name: "updated",
               last_name: "updated",
               email: "updated@example.com",
               phone: "123456789"
          })

          logger.debug(response);

          expect(response.status).toBe(200);
          expect(response.body.data.id).toBe(contact.id);
          expect(response.body.data.first_name).toBe("updated");
          expect(response.body.data.last_name).toBe("updated");
          expect(response.body.data.email).toBe("updated@example.com");
          expect(response.body.data.phone).toBe("123456789");
     });

     it('should reject update contact if id is not found', async function () {
          const contact = await ContactTest.get();

          const response = await supertest(web)
          .put(`/api/contacts/${contact.id + 1}`)
          .set("X-API-TOKEN", "test")
          .send({
               first_name: "updated",
               last_name: "updated",
               email: "updated@example.com",
               phone: "123456789"
          })

          logger.debug(response);

          expect(response.status).toBe(404);
          expect(response.body.errors).toBeDefined();
     });
});

describe('DELETE /api/contacts/:contactId', () => {

     beforeEach(async () => {
          await UserTest.create();
          await ContactTest.create();
     });

     afterEach(async () => {
          await ContactTest.deleteAll();
          await UserTest.delete();
     });

     it('should be able to remove contact', async () => {
          const contact = await ContactTest.get();
          
          const response = await supertest(web)
          .delete(`/api/contacts/${contact.id}`)
          .set("X-API-TOKEN", "test")

          logger.debug(response);

          expect(response.status).toBe(200);
          expect(response.body.data).toBe("OK");
     });

     it('should be able to remove contact', async () => {
          const contact = await ContactTest.get();
          
          const response = await supertest(web)
          .delete(`/api/contacts/${contact.id + 1}`)
          .set("X-API-TOKEN", "test")

          logger.debug(response);

          expect(response.status).toBe(404);
          expect(response.body.errors).toBeDefined();
     });
});