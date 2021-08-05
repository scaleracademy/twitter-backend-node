import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import {
  MockPasswordRepositoryProvider,
  MockSessionRepositoryProvider,
  MockUserFollowingsRepositoryProvider,
  MockUsersRepositoryProvider,
} from 'src/commons/mocks/mock.providers';
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
        MockUserFollowingsRepositoryProvider,
        MockPasswordRepositoryProvider,
        MockSessionRepositoryProvider,
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
