import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotIn } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'email']), //kế thừa class của create user
) {
  @IsNotIn(['password'], { message: 'Updating password is not allowed' })
  password?: string;

  @IsNotIn(['email'], { message: 'Updating email is not allowed' })
  email?: string;
}
