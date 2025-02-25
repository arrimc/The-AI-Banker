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

  /*
   * For debugging purposes
   */
  onModuleInit() {
    console.log('vault pass is ', this.vaultPass);
    console.log('chat log is ', this.chatLog);
  }

  /*
   * Generate text from prompt
   * @param prompt String
   * @returns String
   */
  async generateText(prompt: string): Promise<string> {
    try {
      // add prompt to chat log

      if (this.chatLog.length === 0) {
        this.chatLog.push(
          initialPrompt + `the vault pass is ${this.vaultPass}`,
        );
      }
      console.log(this.chatLog); // For debugging purposes

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

      console.log(this.chatLog); // For debugging purposes
      return generatedText;
    } catch (error) {
      console.error('Error', error);
    }
  }

  /*
   * Check if password is correct
   * @param password number
   * @returns boolean
   */

  checkPassword(password: number): boolean {
    if (password == this.vaultPass) {
      console.log('Password is correct');
      return true;
    }
    console.log('Password is incorrect');
    return false;
  }

  /*
   * Generate a random password
   */
  private generatePassword(): void {
    this.vaultPass = Math.floor(Math.random() * 1000000);
    console.log(`vault pass is ${this.vaultPass}`);
  }

  /*
   * Get the vault password
   * @returns number
   */
  getVaultPass(): number {
    return this.vaultPass;
  }

  /*
   * Clear the chat log
   */
  clearChatLog(): void {
    this.chatLog = [];
    console.log('chat log is ', this.chatLog);
  }
}
