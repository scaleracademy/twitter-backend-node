import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApiModule } from 'src/api.module';
import { TestDbModule } from 'src/commons/db.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule, TestDbModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // test user creation
  it('(POST) /users/', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'arnav',
        password: 'arnav123',
        name: 'Arnav Gupta',
        bio: 'This is a nice guy!',
      })
      .expect(201);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/hello')
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  });
});
