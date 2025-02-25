import { Body, Controller, Post, Get } from '@nestjs/common';
import {
  GeminiRequestDto,
  PasswordRequestDto,
  PasswordResponseDto,
} from './dto/gemini-request.dto';
import { GeminiService } from './gemini.service';

@Controller('ai')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  /**
   * Send a message to the Gemini AI
   * @param body  GeminiRequestDto type String
   * @returns  String
   */
  @Post('message')
  async sendMessage(@Body() body: GeminiRequestDto): Promise<string> {
    try {
      const response = await this.geminiService.generateText(body.message);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Get the vault password
   * @returns PasswordResponseDto type number
   */
  @Get('password')
  getPassword(): PasswordResponseDto {
    const password = this.geminiService.getVaultPass();
    return { password: password.toString() };
  }

  /**
   * Check if vault password is correct
   * @param body PasswordRequestDto type number
   * @returns boolean
   */
  @Post('check-pass')
  sendPassword(@Body() body: PasswordRequestDto): boolean {
    const passStatus = this.geminiService.checkPassword(body.password);
    return passStatus;
  }
}
