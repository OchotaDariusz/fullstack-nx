import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeedService {
  constructor(private readonly usersService: UsersService) {}

  private async createUser() {
    return await this.usersService.addNewUser({
      username: `user_${crypto.randomUUID()}`,
      password: '123Password!',
    });
  }

  private async *userGenerator() {
    const user = await this.createUser();
    await this.usersService.promoteToAdmin(user.id);

    while (true) {
      yield await this.createUser();
    }
  }

  public async seed(amount = 60) {
    let counter = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _user of this.userGenerator()) {
      if (counter === amount) break; // will generate 60 users + 1 admin
      counter++;
    }
  }
}
