import {BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({unique: true})
  title!: string

  @Column({unique: true})
  text!: string

  @CreateDateColumn()
  createdAt?: string  

  @UpdateDateColumn()
  updatedAt?: string  
}