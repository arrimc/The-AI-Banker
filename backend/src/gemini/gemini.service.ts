import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private googleAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private cacheId: string | null = null;
  private chatLog: string[] = [];
  private readonly initialInput = '----'; // initial input for Banker roleplay

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('config.genApiKey');
    this.googleAI = new GoogleGenerativeAI(apiKey);
    this.model = this.googleAI.getGenerativeModel({
      model: this.configService.get<string>('config.gemModel'),
    });
  }

  async generateText(prompt: string): Promise<string> {
    try {
      // add prompt to chat log
      if (this.chatLog.length === 0) {
        this.chatLog.push(this.initialInput);
      }

      this.chatLog.push(`User says: ${prompt}`);

      const context = this.chatLog.join('\n');

      const response = await this.model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [{ text: context }],
          },
        ],
      });

      const generatedText = response.response.text();
      console.log(generatedText);
      // add response to chat log
      this.chatLog.push(`AI says: ${generatedText}`);

      console.log(this.chatLog);
      return generatedText;
    } catch (error) {
      console.error('Error', error);
    }
  }

  clearChatLog(): void {
    this.chatLog = [];
  }
}
