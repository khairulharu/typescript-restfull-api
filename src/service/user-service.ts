import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, toUserResponse, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

export class UserService {
     
     static async register(request: CreateUserRequest): Promise<UserResponse> {
          const registerRequest = Validation.validate(UserValidation.REGISTER, request);

          const totalWithSameUsername = await prismaClient.user.count({
               where: {
                    username: registerRequest.username
               }
          });

          if (totalWithSameUsername != 0) {
               throw new ResponseError(400, "username already exist")
          }

          registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

          const user = await prismaClient.user.create({
               data: registerRequest
          });

          return toUserResponse(user)
     };

     // static async login(request: CreateUserLoginRequest): Promise<UserResponse> {
     //      const loginRequest = Validation.validate(UserValidation.LOGIN, request);

     //      const searchUserWithSameUsername = await prismaClient.user.findFirst({
     //           where: {
     //                username: loginRequest.username
     //           }
     //      });

     //      if (searchUserWithSameUsername === null) {
     //           throw new ResponseError(400, "error username not found");
     //      }

     //      const userParsed = toUserParsedData(searchUserWithSameUsername);

     //      const isUserSamePassword = await bcrypt.compare(loginRequest.password, userParsed.password);

     //      if (!isUserSamePassword) {
     //           throw new ResponseError(404, "wrong password")
     //      }
     // };

}