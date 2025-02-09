import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  genApiKey: process.env.GEMINI_API_KEY,
  gemModel: process.env.GEMINI_MODEL,
}));
