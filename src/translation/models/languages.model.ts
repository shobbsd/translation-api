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
  languages: { language: string; name: string }[];
}
