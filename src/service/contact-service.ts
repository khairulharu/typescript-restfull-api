import { User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, toContactResponse } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { number } from "zod";

export class ContactService {
     static async create(user: User, req: CreateContactRequest): Promise<ContactResponse> {
          const createRequest = Validation.validate(ContactValidation.CREATE, req);

          const record = {
               ...createRequest,
               ...{username: user.username}
          };

          const contact = await prismaClient.contact.create({
               data: record
          });

          return toContactResponse(contact);
     }
}