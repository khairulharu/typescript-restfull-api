import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, toUserResponse, UserResponse, LoginUserRequest } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import { v4 as uuid } from "uuid";
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

     static async login(request: LoginUserRequest): Promise<UserResponse> {
          const loginRequest = Validation.validate(UserValidation.LOGIN, request);

          let user = await prismaClient.user.findUnique({
               where: {
                    username: loginRequest.username
               }
          });

          if (!user) {
               throw new ResponseError(401, "Username or Password is Wrong");
          }

          const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

          if (!isPasswordValid) {
               throw new ResponseError(401, "Username or Password is Wrong")
          }

          user = await prismaClient.user.update({
               where: {
                    username: loginRequest.username
               },
               data: {
                    token: uuid()
               }
          });

          const response = toUserResponse(user);
          response.token = user.token!;

          return response
     };

}