import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return app
      .inject({
        method: 'GET',
        url: '/hello',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.payload).toBe('Hello World!');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
