import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetupDto {
  @ApiProperty({ description: 'The master password for the Personal OS' })
  @IsString()
  @MinLength(12, { message: 'Password must be at least 12 characters long.' })
  password!: string;
}
