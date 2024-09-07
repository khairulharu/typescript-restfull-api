import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/user-service";
import { CreateUserRequest } from "../model/user-model";

export class UserController {
     static async register(req: Request, res: Response, next: NextFunction) {
          try {
               const request: CreateUserRequest = req.body as CreateUserRequest;

               const response = await UserService.register(request);

               res.status(200).json({
                    data: response
               })
          } catch (error) {
               next(error)
          }
     }
}