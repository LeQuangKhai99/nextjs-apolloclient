import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import * as argon2 from 'argon2'
import { UserMutationResponse } from "../types/UserMutationResponse";
import { RegisterInput } from "../types/RegisterInput";
import { validateRegisterInput } from '../utils/validateRegisterInput';
import { LoginInput } from "../types/LoginInput";

@Resolver()
export class UserResolver {
  @Mutation(_returns => UserMutationResponse, {nullable: true})
  async register(
    @Arg('registerInput') registerInput: RegisterInput,
  ): Promise<UserMutationResponse> {
    const validateRegisterInputErrors = validateRegisterInput(registerInput);
    console.log(validateRegisterInputErrors);
    
    if(validateRegisterInputErrors !== undefined) 
    return {
      code: 400,
      success: false,
      ...validateRegisterInputErrors
    }
    try {
      const {email, username, password} = registerInput;
      const existUser = await User.findOne({
        where: [
          {username},
          {email}
        ]
      })
      if(existUser) return {
        code: 500,
        success: false,
        message: 'is exist user',
        errors: [
          {
            field: existUser.username === username ? 'username' : 'email',
            message: `${username} or ${email} already taken`
          }
        ]
      }

      const hashPass = await argon2.hash(password)

      const newUser = User.create({
        username, 
        password: hashPass,
        email
      }) 

      return {
        code: 200,
        success: true,
        message: 'Create user success',
        user: await User.save(newUser)
      }
    } catch(err) {
      console.log(err);
      return {
        code: 500,
        success: false,
        message: 'Internal server error',
      }
    }
  }

  @Mutation(_return => UserMutationResponse)
  async login(@Arg('loginInput') {usernameOrEmail, password}: LoginInput):Promise<UserMutationResponse> {
    try {
      const existingUser = await User.findOne({
        where: [
          {username: usernameOrEmail},
          {email: usernameOrEmail}
        ]
      })
  
      if(!existingUser)
      return {
        code: 400,
        success: false,
        message: 'User not found',
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'Username or Email incorect'
          }
        ]
      }
  
      const passwordValid = await argon2.verify(existingUser.password, password)
      if(!passwordValid)
      return {
        code: 400,
        success: false,
        message: 'Wrong password',
        errors: [
          {
            field: 'password',
            message: 'Password incorect'
          }
        ]
      }

      return {
        code: 200,
        success: true,
        message: "Login success",
        user: existingUser
      }
    }catch(err) {
      return {
        code: 500,
        success: false,
        message: 'Internal server error',
      }
    }
  }
}