import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    const message = 'Hello API';
    return { message };
  }
}
