import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY } from '../constants';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return user;
  }

  async findOne(
    email: string,
    scope: string = 'minimal',
  ): Promise<User | undefined> {
    return this.userRepository.scope(scope).findOne({
      where: {
        email,
      },
    });
  }

  async findValidateUser(name: string): Promise<User | undefined> {
    return this.userRepository.scope('full').findOne({
      where: {
        name,
      },
    });
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const { email } = updateUserDto;
    const updateUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    Object.assign(updateUser, updateUserDto);
    await updateUser.save();
    return updateUser;
  }
}
