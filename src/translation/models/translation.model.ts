import { ApiProperty } from '@nestjs/swagger';

export class TranslationResponse {
  @ApiProperty()
  word_count: number;

  @ApiProperty()
  character_count: number;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        translation: { type: 'string' },
      },
    },
  })
  translations: Array<{ translation: string }>;
}
