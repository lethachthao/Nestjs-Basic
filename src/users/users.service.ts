import { getHashPassword } from './../util/helpers';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  //Check email tồn tại
  isEmailExist = async (email: string): Promise<boolean> => {
    const count = await this.usersRepository.count({
      where: { email },
    });
    return count > 0; // Nếu count > 0, email đã tồn tại
  };

  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    //Check email
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(
        `Email ${email} đã tồn tại, vui lòng sử dụng email khác`,
      );
    }

    const hashPassword = await getHashPassword(createUserDto.password);

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashPassword,
    });
    const savedUser = await this.usersRepository.save(user);

    return {
      id: savedUser.id,
    };
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<User>(this.usersRepository, options);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<User>> {
    return this.paginate(options);
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id: id },
    });
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'name'],
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

  async handleRegister(resgisterDto: CreateAuthDto) {
    const { email, name, password } = resgisterDto;

    //Check email
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(
        `Email ${email} đã tồn tại, vui lòng sử dụng email khác`,
      );
    }

    const hashPassword = await getHashPassword(resgisterDto.password);

    //send email

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashPassword,
      isActive: false,
      codeId: uuidv4(),
      codeExpired: dayjs().add(1, 'minute').toDate(),
    });
    const savedUser = await this.usersRepository.save(user);

    return {
      id: savedUser.id,
    };
  }
}
