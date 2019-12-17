import * as dotenv from 'dotenv';
dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({ msg: 'Hello World!' });
  });

  describe('/api/translate', () => {
    it('GET:200 returns an array of available languages', () => {
      return request(app.getHttpServer())
        .get('/api/translate')
        .expect(200)
        .then(({ body: { languages } }) => {
          expect(
            languages.every(language => language.language && language.name),
          ).toBe(true);
        });
    });
    it('POST:200, returns a translation', () => {
      return request(app.getHttpServer())
        .post('/api/translate')
        .send({ from: 'en', to: 'es', text: 'hello' })
        .expect(200)
        .then(({ body }) => {
          Object.keys(body).forEach(key => {
            const keys = ['word_count', 'character_count', 'translation'];
            expect(keys.includes(key)).toBe(true);
          });
        });
    });
    describe('/ERRORS', () => {
      it('POST:400, returns an error regarding incorrectly formatted body (from)', () => {
        return request(app.getHttpServer())
          .post('/api/translate')
          .send({ 'not-from': 'en', to: 'es', text: 'hello' })
          .expect(400)
          .then(({ body: { message } }) => {
            const errorMsg = message[0];
            expect(errorMsg).toStrictEqual({
              property: 'from',
              children: [],
              constraints: { isString: 'from must be a string' },
            });
          });
      });
      it('POST:400, returns an error regarding incorrectly formatted body (to)', () => {
        return request(app.getHttpServer())
          .post('/api/translate')
          .send({ from: 'en', 'not-to': 'es', text: 'hello' })
          .expect(400)
          .then(({ body: { message } }) => {
            const errorMsg = message[0];
            expect(errorMsg).toStrictEqual({
              property: 'to',
              children: [],
              constraints: { isString: 'to must be a string' },
            });
          });
      });
      it('POST:400, returns an error regarding incorrectly formatted body (text)', () => {
        return request(app.getHttpServer())
          .post('/api/translate')
          .send({ from: 'en', to: 'es', 'not-text': 'hello' })
          .expect(400)
          .then(({ body: { message } }) => {
            const errorMsg = message[0];
            expect(errorMsg).toStrictEqual({
              property: 'text',
              children: [],
              constraints: { isString: 'text must be a string' },
            });
          });
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
