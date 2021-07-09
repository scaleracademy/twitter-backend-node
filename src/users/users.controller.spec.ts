import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { PasswordEntity } from 'src/auth/passwords.entity';
import { SessionsEntity } from 'src/auth/sessions.entity';
import { MockUsersRepositoryProvider } from 'src/commons/mocks/mock.providers';
import { MockPasswordsRepository } from 'src/commons/mocks/passwords.repository.mock';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
        MockUsersRepositoryProvider,
        {
          provide: getRepositoryToken(PasswordEntity),
          useClass: MockPasswordsRepository,
        },
        {
          provide: getRepositoryToken(SessionsEntity),
          useValue: {},
        },
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
