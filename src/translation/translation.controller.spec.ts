import { Test, TestingModule } from '@nestjs/testing';
import { TranslationController } from './translation.controller';
import { WatsonService } from './watson.service';

describe('Translation Controller', () => {
  let controller: TranslationController;
  let watsonService: WatsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranslationController],
      providers: [WatsonService],
    }).compile();

    controller = module.get<TranslationController>(TranslationController);
    watsonService = module.get<WatsonService>(WatsonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
