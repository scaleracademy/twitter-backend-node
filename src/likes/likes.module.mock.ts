import { Module } from '@nestjs/common';
import { MockLikesRepositoryProvider } from 'src/commons/mocks/mock.providers';
import { LikesService } from 'src/likes/likes.service';

@Module({
  providers: [MockLikesRepositoryProvider, LikesService],
  exports: [MockLikesRepositoryProvider, LikesService],
})
export class MockLikesModule {}
