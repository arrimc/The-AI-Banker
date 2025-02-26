import { ApiProperty } from '@nestjs/swagger';

export class GeminiRequestDto {
  @ApiProperty({
    description: 'User message to send to the AI',
    example: 'Hello, I lost my vault password... Can you help me?',
  })
  message: string;
}

export class PasswordRequestDto {
  @ApiProperty({ description: 'Password to validate', example: 123456 })
  password: number;
}

export class PasswordResponseDto {
  @ApiProperty({
    description: 'Vault password returned by the system',
    example: 987654,
  })
  password: number;
}
