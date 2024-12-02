import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getHashPassword = (password: string): string => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt); // Đúng: sử dụng tham số password
    return hash;
  };

  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.getHashPassword(createUserDto.password);
    const user = await this.usersRepository.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashPassword,
    });
    const savedUser = await this.usersRepository.save(user);

    return savedUser;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id: id },
    });
  }

  async findOneByUserName(username: string) {
    const user = await this.usersRepository.findOne({
      where: { email: username },
    });
    return user;
  }

  async isvalidPassword(password: string, hash: string): Promise<boolean> {
    console.log('Password:', password);
    console.log('Hash:', hash);

    return await bcrypt.compare(password, hash);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    const updateUser = this.usersRepository.merge(user, updateUserDto);

    return await this.usersRepository.save(updateUser);
  }

  async remove(id: number) {
    const deleteUser = await this.usersRepository.delete(id);

    return 'xóa người dùng thành công';
  }
}
