import LanguageTranslatorV3, {
  TranslateParams,
} from 'ibm-watson/language-translator/v3';
import { IamAuthenticator } from 'ibm-watson/auth';
import languages from './languages';
import { Injectable } from '@nestjs/common';

const { apikey, url } = process.env;

@Injectable()
export class WatsonService {
  private languageTranslator: LanguageTranslatorV3;

  constructor() {
    this.languageTranslator = new LanguageTranslatorV3({
      version: '2018-05-01',
      authenticator: new IamAuthenticator({
        apikey,
      }),
      url,
    });
  }

  getLanguages(): Promise<any> {
    return Promise.resolve(languages);
  }

  fetchTranslation(
    text: string,
    languageFrom: string,
    languageTo: string,
  ): Promise<any> {
    const translateParams: TranslateParams = {
      text: [text],
      modelId: `${languageFrom}-${languageTo}`,
    };

    return this.languageTranslator
      .translate(translateParams)
      .then(translationResult => translationResult.result);
  }
}
