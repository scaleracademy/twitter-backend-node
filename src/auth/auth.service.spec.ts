import { Test, TestingModule } from '@nestjs/testing';
import {
  MockPasswordRepositoryProvider,
  MockSessionRepositoryProvider,
  MockUsersRepositoryProvider,
} from 'src/commons/mocks/mock.providers';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        MockUsersRepositoryProvider,
        MockPasswordRepositoryProvider,
        MockSessionRepositoryProvider,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
