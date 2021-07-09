import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { PasswordEntity } from 'src/auth/passwords.entity';
import { MockPasswordsRepository } from 'src/commons/mocks/passwords.repository.mock';
import { MockUsersRepository } from 'src/commons/mocks/users.repository.mock';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
        {
          provide: getCustomRepositoryToken(UsersRepository),
          useClass: MockUsersRepository,
        },
        {
          provide: getRepositoryToken(PasswordEntity),
          useClass: MockPasswordsRepository,
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
