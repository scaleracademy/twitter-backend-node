import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, PostsModule, HashtagsModule, AuthModule],
})
export class ApiModule {}
