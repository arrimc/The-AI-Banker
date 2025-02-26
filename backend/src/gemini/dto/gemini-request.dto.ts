import { ApiProperty } from '@nestjs/swagger';

export class GeminiDto {
  @ApiProperty({
    description: 'Example message',
    example: 'Hello, How are you?',
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

export class PasswordCheckDto {
  @ApiProperty({
    description: 'Vault password returned by the system',
    example: true,
  })
  response: boolean;
}
