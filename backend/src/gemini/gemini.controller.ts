import { Body, Controller, Post } from '@nestjs/common';
import { GeminiRequestDto } from './dto/gemini-request.dto';
import { GeminiService } from './gemini.service';

@Controller('ai')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('message')
  async sendMessage(@Body() body: GeminiRequestDto) {
    try {
      const response = await this.geminiService.generateText(body.message);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
