import { User } from "@prisma/client"; 

// export type UserParseData = {
//      username: string;
//      password: string;
//      name: string;
//      token?: string | null;
// }

export type UserResponse = {
     username: string;
     name: string;
     token?: string;
}

export type CreateUserRequest = {
     username: string;
     name: string;
     password: string;
}

// export type CreateUserLoginRequest = {
//      username: string;
//      password: string;
// }

export function toUserResponse(user: User): UserResponse {
     return {
          name: user.name,
          username: user.username
     }
}

// export function toUserParsedData(user: User) : UserParseData {
//      return {
//           username : user.name,
//           password : user.password,
//           name: user.name,
//           token: user.token
//      }
// }