import { User } from './../entities/User';
import { InterfaceType, Field, ObjectType } from 'type-graphql';
import { ImutationResponse } from './MutationResponse';
import { FieldError } from './FieldError';

@ObjectType()
export class UserMutationResponse implements ImutationResponse {
  @Field()
  code!: number
  @Field()
  success!: boolean
  @Field()
  message?: string

  @Field({nullable: true})
  user?: User

  @Field(_type => [FieldError], {nullable: true})
  errors?: FieldError[]
}