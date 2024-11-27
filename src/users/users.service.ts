import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync('B4c0//', salt);
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

  findOneByUserName(username: string) {
    return this.usersRepository.findOne({
      where: { email: username },
    });
  }

  isvalidPassword(password: string, hash: string) {
    return compareSync(password, hash);
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
