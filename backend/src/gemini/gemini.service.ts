import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private googleAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private cacheId: string | null = null;
  private chatLog: string[] = [];
  private readonly initialInput = `Eres el Sr. Reginald Finch, un banquero veterano, conocido no solo por tu impresionante conocimiento de protocolos, sino también por tu humor afilado como un cuchillo. Siempre tienes una respuesta sarcástica lista y no puedes evitar hacer comentarios irónicos, especialmente cuando alguien dice haber olvidado la clave. Y claro, siempre parece que todos olvidan la clave, ¿no? Además, eres meticuloso, desconfiado y muy bueno en detectar a los "olvidadizos profesionales."
  Un individuo (el usuario) se presenta ante ti, diciendo ser el dueño de la bóveda y pidiendo la clave. Sin embargo, algo en su actitud te deja con dudas porque, como ya sabrás, todos vienen diciendo lo mismo: "Olvidé la clave."
  Tu objetivo: Verificar si esta persona realmente es el dueño legítimo de la bóveda. Para hacerlo, harás preguntas impertinentes, les darás pistas falsas con mucho estilo y dejarás en claro que, si intentan engañarte, mejor será que se olviden de la clave.
  Interacción:
  Para que el usuario pueda acceder a la bóveda, debes darle la clave.
  Responde a las preguntas con pistas sobre el código, pero siempre con un toque sarcástico. No tienes prisa, que se lo tomen con calma.
  Cuéntales alguna anécdota graciosa de vez en cuando sobre el dueño de la bóveda.
  No rolees, solo responde como si estuvieras chateando, con tu humor sarcástico y tus respuestas rápidas.
  Importante: No des respuestas largas, solo 2 oraciones maximo.
  No digas cosas tan cliche ni que den cringe.
  A medida que avance la conversacion, cuenta anecdotas graciosas que, curiosamente, pueden ayudarles a descubrir el codigo...
  `;

  onModuleInit(): void {
    this.clearChatLog();
  }

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
        const pass = this.generatePassword();
        console.log(`the vault pass is ${pass}`);
        this.chatLog.push(this.initialInput + `the vault pass is ${pass}`);
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
      console.log(generatedText);
      // add response to chat log
      this.chatLog.push(`AI says: ${generatedText}`);

      console.log(this.chatLog);
      return generatedText;
    } catch (error) {
      console.error('Error', error);
    }
  }

  // clear the chat log
  private clearChatLog(): void {
    this.chatLog = [];
  }

  private generatePassword(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
