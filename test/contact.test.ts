import supertest from "supertest";
import { web } from "../src/application/web";
import { ContactTest, UserTest } from "./test-util";
import { logger } from "../src/application/logging";

describe('POST /api/contacts', () => {
     
     beforeEach(async () => {
          await UserTest.create();
     });

     afterEach(async () => {
          await ContactTest.deleteAll();
          await UserTest.delete();
     });

     it('should create new contact', async () => {
          const response = await supertest(web)
          .post("/api/contacts")
          .set("X-API-TOKEN", "test")
          .send({
               first_name: "Khairul",
               last_name: "aswad",
               phone: "0893384711",
               email: "khairul@example.com"
          })

          logger.debug(response);

          expect(response.status).toBe(200);
          expect(response.body.data.id).toBeDefined();
          expect(response.body.data.first_name).toBe("Khairul");
          expect(response.body.data.last_name).toBe("aswad");
          expect(response.body.data.email).toBe("khairul@example.com");
          expect(response.body.data.phone).toBe("0893384711");
     });

     it('should still be able to create contact if just lastname are fill', async () => {
          const response = await supertest(web)
          .post("/api/contacts")
          .set("X-API-TOKEN", "test")
          .send({
               first_name: "Khairul"
          });

          logger.debug(response);

          expect(response.status).toBe(200);
          expect(response.body.data.id).toBeDefined();
          expect(response.body.data.first_name).toBe("Khairul");
     });

     it('should can still create contact if just one or two field is fill', async () => {
          const response = await supertest(web)
          .post("/api/contacts")
          .set("X-API-TOKEN", "test")
          .send({
               first_name: "khairul",
               phone: "089664522"
          });

          logger.debug(response);

          expect(response.status).toBe(200);
          expect(response.body.data.first_name).toBe("khairul");
          expect(response.body.data.phone).toBe("089664522");
     });
     
     it('should still be able to create contact if just firstname are fill', async () => {
          const response = await supertest(web)
          .post("/api/contacts")
          .set("X-API-TOKEN", "test")
          .send({
               first_name: "Khairul"
          });

          logger.debug(response);

          expect(response.status).toBe(200);
          expect(response.body.data.id).toBeDefined();
          expect(response.body.data.first_name).toBe("Khairul");
     });

     it('should reject if email is not a email string convention', async () => {
          const response = await supertest(web)
          .post("/api/contacts")
          .set("X-API-TOKEN", "test")
          .send({
               first_name: "Khairul",
               last_name: "aswad",
               phone: "0893384711",
               email: "khairul"
          });

          logger.debug(response);

          expect(response.status).toBe(400);
          expect(response.body.errors).toBeDefined();
     });

     it('should decline if body is not fill or just string with no body', async () => {
          const response = await supertest(web)
          .post("/api/contacts")
          .set("X-API-TOKEN", "test")
          .send({
               first_name: "",
               last_name: "",
               phone: "",
               email: ""
          });

          logger.debug(response);

          expect(response.status).toBe(400);
          expect(response.body.errors).toBeDefined();
     });

    
});