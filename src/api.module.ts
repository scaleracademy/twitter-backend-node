import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [UsersModule, PostsModule, HashtagsModule, AuthModule, LikesModule],
})
export class ApiModule {}
