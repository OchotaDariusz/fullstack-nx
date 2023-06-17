import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Role } from '@fullstack/types';
import { UserEntity } from './entity/user.entity';
import { User } from '@fullstack/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  private stripUserPassword(user: User): User {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDetails } = user;
    return userDetails;
  }

  private async saveToRepository(user: User) {
    const savedUser = await this.userRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return this.stripUserPassword(savedUser);
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      return this.stripUserPassword(user);
    });
  }

  async getUsers(page: number): Promise<User[]> {
    const users = await this.userRepository
      .createQueryBuilder('users')
      .take(5)
      .skip((page - 1) * 5)
      .getMany();
    return users.map((user) => {
      return this.stripUserPassword(user);
    });
  }

  async countAll(): Promise<number> {
    return await this.userRepository.count();
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException("Can't find that user.");
    }
    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("Can't find that user.");
    }
    return this.stripUserPassword(user);
  }

  async addNewUser(newUserDetails: User): Promise<User> {
    const user = await this.userRepository.findOneBy({
      username: newUserDetails.username,
    });
    if (user) {
      throw new ConflictException('User already exists!');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newUserDetails.password, salt);
    const newUser = { ...newUserDetails, password: hashedPassword };
    newUser.roles = [Role.USER];
    const addedUser = await this.saveToRepository(newUser);
    return this.stripUserPassword(addedUser);
  }

  async updateUser(id: string, updateDetails: User): Promise<User> {
    const userToUpdate = await this.userRepository.findOneBy({ id });
    if (!userToUpdate) {
      throw new NotFoundException("Can't find user to update.");
    }

    if ('username' in updateDetails) {
      const user = await this.userRepository.findOneBy({
        username: updateDetails.username,
      });
      if (user) {
        throw new ConflictException('User with such username already exists!');
      }
      userToUpdate.username = updateDetails.username;
    }
    if ('password' in updateDetails) {
      const salt = await bcrypt.genSalt();
      userToUpdate.password = await bcrypt.hash(updateDetails.password, salt);
    }
    const updatedUser = await this.saveToRepository(userToUpdate);
    return this.stripUserPassword(updatedUser);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("Can't find user to delete.");
    }
    if (user.roles.includes(Role.ADMIN)) {
      throw new ForbiddenException('Admin account cannot be deleted');
    }
    return await this.userRepository.delete(id);
  }
}
