import { ApiProperty } from '@nestjs/swagger';

export class LanguagesReponse {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        language: { type: 'string' },
        name: { type: 'string' },
      },
    },
  })
  languages: Array<{ language: string; name: string }>;
}
