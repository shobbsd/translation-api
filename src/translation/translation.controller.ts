import {
  Controller,
  Get,
  Body,
  ValidationPipe,
  Post,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { WatsonService } from './watson.service';
import { TranslationDto } from './translation.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { TranslationResponse } from './models/translation.model';
import { LanguagesReponse } from './models/languages.model';

@Controller('api/translate')
export class TranslationController {
  constructor(private watsonService: WatsonService) {}

  @Get()
  @HttpCode(200)
  @ApiCreatedResponse({
    status: 200,
    description: 'A list of languages the model can translate',
    type: LanguagesReponse,
  })
  async getLanguages() {
    const languages = await this.watsonService.getLanguages();
    return { languages };
  }

  @Post()
  @HttpCode(200)
  @ApiCreatedResponse({
    status: 200,
    description: 'The successful translation',
    type: TranslationResponse,
  })
  async sendTranslation(
    @Body(
      new ValidationPipe({
        transform: true,
        validationError: { target: false },
      }),
    )
    translationDto: TranslationDto,
  ) {
    const { text, from, to } = translationDto;
    try {
      const {
        word_count,
        character_count,
        translations,
      } = await this.watsonService.fetchTranslation(text, from, to);
      const translation = translations[0].translation;
      return { word_count, character_count, translation };
    } catch (err) {
      if (err.message === 'Model not found.')
        throw new HttpException(
          `Translation model "${from}" to "${to}" does not exist`,
          404,
        );
    }
  }
}
