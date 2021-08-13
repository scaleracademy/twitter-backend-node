import { Module } from '@nestjs/common';
import { RequiredAuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import {
  MockUsersRepositoryProvider,
  MockPostsRepositoryProvider,
  MockPasswordRepositoryProvider,
  MockSessionRepositoryProvider,
  MockLikesRepositoryProvider,
} from 'src/commons/mocks/mock.providers';
import { LikesService } from 'src/likes/likes.service';

@Module({
  providers: [
    MockUsersRepositoryProvider,
    MockPostsRepositoryProvider,
    MockLikesRepositoryProvider,
    MockPasswordRepositoryProvider,
    MockSessionRepositoryProvider,
    RequiredAuthGuard,
    LikesService,
    AuthService,
  ],
  exports: [
    MockUsersRepositoryProvider,
    MockPostsRepositoryProvider,
    MockLikesRepositoryProvider,
    MockPasswordRepositoryProvider,
    MockSessionRepositoryProvider,
    RequiredAuthGuard,
    LikesService,
    AuthService,
  ],
})
export class MockPostsModule {}
