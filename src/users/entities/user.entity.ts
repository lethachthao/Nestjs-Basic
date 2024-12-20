import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  age: string;

  @Column()
  phoneNumber: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
