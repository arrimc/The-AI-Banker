import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initialPrompt } from '../prompt/initialPrompt ';
import {
  GeminiDto,
  PasswordCheckDto,
  PasswordResponseDto,
} from './dto/gemini-request.dto';
@Injectable()
export class GeminiService {
  private googleAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private chatLog: string[] = [];
  private vaultPass: number;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('config.genApiKey');
    this.googleAI = new GoogleGenerativeAI(apiKey);
    this.model = this.googleAI.getGenerativeModel({
      model: this.configService.get<string>('config.gemModel'),
    });
    this.generatePassword();
  }
  private readonly logger = new Logger('GeminiService');

  /*
   * For debugging purposes
   */
  onModuleInit() {
    this.logger.debug('vault pass is ', this.vaultPass);
    this.logger.debug('chat log is ', this.chatLog);
  }

  /*
   * Generate text from prompt
   * @param prompt String
   * @returns String
   */
  async generateText(prompt: string): Promise<GeminiDto> {
    try {
      // add prompt to chat log
      if (this.chatLog.length === 0) {
        this.chatLog.push(
          initialPrompt + `the vault pass is ${this.vaultPass}`,
        );
      }
      // this.logger.debug(this.chatLog); // For debugging purposes

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
      // add response to chat log
      this.chatLog.push(`AI says: ${generatedText}`);

      // this.logger.debug(this.chatLog); // For debugging purposes

      return {
        message: generatedText,
      };
    } catch (error) {
      this.logger.error('Error', error);
      throw new HttpException(
        'Failed to generate text',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /*
   * Check if password is correct
   * @param password number
   * @returns boolean
   */

  checkPassword(password: number): PasswordCheckDto {
    const checkPass = password == this.vaultPass;
    return {
      response: checkPass,
    };
  }

  /*
   * Generate a random password
   */
  private generatePassword(): void {
    this.vaultPass = Math.floor(Math.random() * 1000000);
    this.logger.debug(`vault pass is ${this.vaultPass}`);
  }

  /*
   * Get the vault password
   * @returns number
   */
  getVaultPass(): PasswordResponseDto {
    return {
      password: this.vaultPass,
    };
  }

  /*
   * Clear the chat log
   */
  clearChatLog(): void {
    this.chatLog = [];
  }
}
