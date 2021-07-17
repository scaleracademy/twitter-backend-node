import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApiModule } from 'src/api.module';
import { TestDbModule } from 'src/commons/db.module';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';

describe('UsersController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule, TestDbModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
  });

  // test user creation
  it('(POST) /users/', () => {
    return app
      .inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'arnav',
          password: 'arnav123',
          name: 'Arnav Gupta',
          bio: 'This is a nice guy!',
        },
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
