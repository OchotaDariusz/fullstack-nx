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

  private async saveToRepository(user: User) {
    return await this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUsers(page: number, limit: number): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('users')
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();
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
    return user;
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
    return await this.saveToRepository(newUser);
  }

  async updateUser(id: string, updateDetails: Partial<User>): Promise<User> {
    const userToUpdate = await this.userRepository.findOneBy({ id });
    if (!userToUpdate) {
      throw new NotFoundException("Can't find user to update.");
    }

    const { password: oldPassword } = userToUpdate;
    if ('password' in updateDetails) {
      const salt = await bcrypt.genSalt();
      userToUpdate.password = await bcrypt.hash(updateDetails.password, salt);
    }

    if ('username' in updateDetails) {
      const user = await this.userRepository.findOneBy({
        username: updateDetails.username,
      });
      if (user && oldPassword === userToUpdate.password) {
        throw new ConflictException('User with such username already exists!');
      } else {
        userToUpdate.username = updateDetails.username;
      }
    }
    return await this.saveToRepository(userToUpdate);
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
