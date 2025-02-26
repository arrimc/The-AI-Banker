import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerStatus(): string {
    return JSON.stringify({
      message: `Server is up and running!`,
      status: 'success',
      timestamp: new Date().toISOString(),
    });
  }
}
