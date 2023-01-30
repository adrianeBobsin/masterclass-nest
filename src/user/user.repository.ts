import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async update(id: string, dataUser: Partial<UserEntity>) {
    const user = this.getUserById(id);

    Object.entries(dataUser).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }

  async delete(id: string) {
    const user = this.getUserById(id);

    this.users = this.users.filter((savedUser) => savedUser.id !== id);

    return user;
  }

  private getUserById(id: string) {
    const user = this.users.find((savedUser) => savedUser.id === id);

    if (!user) {
      throw new Error('User does not exists.');
    }

    return user;
  }
}
