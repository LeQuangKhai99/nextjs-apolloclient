import {BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({unique: true})
  username!: string

  @Field()
  @Column({unique: true})
  email!: string

  @Column()
  password!: string

  @Field()
  @CreateDateColumn()
  createdAt?: string  

  @Field()
  @UpdateDateColumn()
  updatedAt?: string  
}