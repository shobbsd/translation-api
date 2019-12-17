import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TranslationDto {
  @ApiProperty({ description: 'The text to be translated' })
  @IsString()
  readonly text: string;

  @ApiProperty({ description: 'The input language', example: 'en' })
  @IsString()
  readonly from: string;

  @ApiProperty({ description: 'The output language', example: 'es' })
  @IsString()
  readonly to: string;
}
