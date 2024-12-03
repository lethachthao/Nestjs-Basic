import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column({ select: false }) //không hiển thị trường dữ liệu khi query
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

  @Column({ nullable: true })
  codeId: string;

  @Column({ nullable: true, type: 'timestamp' })
  codeExpired: Date;

  @Column()
  phoneNumber: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
