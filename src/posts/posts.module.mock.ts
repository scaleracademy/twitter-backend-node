import { Module } from '@nestjs/common';
import { RequiredAuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import {
  MockUsersRepositoryProvider,
  MockPostsRepositoryProvider,
  MockPasswordRepositoryProvider,
  MockSessionRepositoryProvider,
} from 'src/commons/mocks/mock.providers';

@Module({
  providers: [
    MockUsersRepositoryProvider,
    MockPostsRepositoryProvider,
    MockPasswordRepositoryProvider,
    MockSessionRepositoryProvider,
    RequiredAuthGuard,
    AuthService,
  ],
  exports: [
    MockUsersRepositoryProvider,
    MockPostsRepositoryProvider,
    MockPasswordRepositoryProvider,
    MockSessionRepositoryProvider,
    RequiredAuthGuard,
    AuthService,
  ],
})
export class MockPostsModule {}
