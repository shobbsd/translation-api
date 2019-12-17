import { Module } from '@nestjs/common';
import { TranslationController } from './translation.controller';
import { WatsonService } from './watson.service';

@Module({
  controllers: [TranslationController],
  providers: [WatsonService],
})
export class TranslationModule {}
