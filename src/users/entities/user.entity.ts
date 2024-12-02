import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  age: string;

  @Column()
  address: string;

  @Column({ default: 'USER' })
  role: string;

  @Column({ default: 'LOCAL' })
  accountType: string;

  @Column({ default: false })
  isActive: boolean;

  @Column()
  codeId: string;

  @Column()
  phoneNumber: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
