import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY } from '../constants';
import { User } from './entities/user.entity';

const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(createUserDto.password, saltRounds);
    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: hash,
    });
    return newUser.id;
  }

  async findOne(email: string): Promise<User | undefined> {
    console.log('UsersService findOne')
    return this.userRepository.findOne({
      where: {
        email,
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
