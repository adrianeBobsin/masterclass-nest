import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.name = userData.name;
    userEntity.id = uuid();

    this.userRepository.save(userEntity);
    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: 'User created successfully.',
    };
  }

  @Get()
  async listAllUsers() {
    const users = await this.userRepository.list();
    const listUsers = users.map((user) => new ListUserDTO(user.id, user.name));
    return listUsers;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() dataUser: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update(id, dataUser);
    return {
      user: updatedUser,
      message: 'User updated successfully.',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deleteUser = await this.userRepository.delete(id);
    return {
      user: deleteUser,
      message: 'User deleted successfully.',
    };
  }
}
