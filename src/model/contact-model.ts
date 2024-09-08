import { Contact } from "@prisma/client";
import { ContactValidation } from "../validation/contact-validation";

export type ContactResponse = {
     id: number;
     first_name: string;
     last_name?: string | null;
     phone?: string | null;
     email?: string | null;
}


export type CreateContactRequest = {
     first_name: string;
     last_name?: string;
     phone?: string;
     email?: string;
}

export function toContactResponse(contact: Contact): ContactResponse {
     return {
          id: contact.id,
          first_name: contact.first_name,
          last_name: contact.last_name,
          phone: contact.phone,
          email: contact.email
     }
}
