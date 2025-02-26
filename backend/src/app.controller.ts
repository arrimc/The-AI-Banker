import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  /**
   * Get server status
   * @returns A message indicating the server status
   */
  @Get()
  @ApiTags('App')
  @ApiOperation({
    summary: 'Get server status',
    description: 'Returns a message indicating if the server is running.',
  })
  @ApiResponse({
    status: 200,
    description: 'Server status',
    example: {
      message: 'Server is up and running!',
      status: 'success',
      timestamp: '2025-02-26T00:20:01.594Z',
    },
  })
  getServerStatus(): string {
    return this.appService.getServerStatus();
  }
}
