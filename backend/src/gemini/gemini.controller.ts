import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import {
  GeminiDto,
  PasswordCheckDto,
  PasswordRequestDto,
  PasswordResponseDto,
} from './dto/gemini-request.dto';
import { GeminiService } from './gemini.service';

@ApiTags('AI')
@Controller('ai')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  /**
   * Send a message to the Gemini AI
   * @param body  GeminiDto type String
   * @returns  String
   */
  @Post('message')
  @ApiOperation({
    summary: 'Send a message to the AI',
    description: 'Processes a text input and returns a response from the AI.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: String,
  })
  @ApiBody({ type: GeminiDto })
  async sendMessage(@Body() body: GeminiDto): Promise<GeminiDto> {
    return this.geminiService.generateText(body.message);
  }

  /**
   * Get the vault password
   * @returns PasswordResponseDto type number
   */
  @Get('password')
  @SkipThrottle()
  @ApiOperation({
    summary: 'Retrieve the vault password',
    description: 'Returns the current password for the vault.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the vault password',
    type: PasswordResponseDto,
  })
  getPassword(): PasswordResponseDto {
    return this.geminiService.getVaultPass();
  }

  /**
   * Check if vault password is correct
   * @param body PasswordRequestDto type number
   * @returns boolean
   */
  @Post('check-pass')
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @ApiOperation({
    summary: 'Validate the vault password',
    description: 'Checks if the provided password is correct.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns true if the password is correct, otherwise false',
    type: Boolean,
  })
  @ApiBody({ type: PasswordRequestDto })
  sendPassword(@Body() body: PasswordRequestDto): PasswordCheckDto {
    return this.geminiService.checkPassword(body.password);
  }

  /**
   * Clear the chat log
   * @returns void
   */
  @Get('clear-log')
  @ApiOperation({
    summary: 'Clear the chat log',
    description: 'Erases all stored conversation history with the AI.',
  })
  @ApiResponse({ status: 200, description: 'Chat log cleared successfully' })
  clearLog(): void {
    this.geminiService.clearChatLog();
  }
}
