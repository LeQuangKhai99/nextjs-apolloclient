import {InterfaceType, Field} from 'type-graphql';

@InterfaceType()
export abstract class ImutationResponse {
  @Field()
  code!: number

  @Field()
  success!: boolean

  @Field({nullable: true})
  message?: string
}