import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initialPrompt } from '../prompt/initialPrompt ';
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

  onModuleInit() {
    console.log('vault pass is ', this.vaultPass);
  }

  async generateText(prompt: string): Promise<string> {
    try {
      // add prompt to chat log

      if (this.chatLog.length === 0) {
        this.chatLog.push(
          initialPrompt + `the vault pass is ${this.vaultPass}`,
        );
      }
      console.log(this.chatLog);

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

      console.log(this.chatLog);
      return generatedText;
    } catch (error) {
      console.error('Error', error);
    }
  }

  checkPassword(password: number): boolean {
    if (password == this.vaultPass) {
      console.log('Password is correct');
      return true;
    }
    console.log('Password is incorrect');
    return false;
  }

  private generatePassword(): void {
    this.vaultPass = Math.floor(Math.random() * 1000000);
    console.log(`vault pass is ${this.vaultPass}`);
  }

  getVaultPass(): number {
    return this.vaultPass;
  }

  // clear the chat log
  private clearChatLog(): void {
    this.chatLog = [];
  }
}
