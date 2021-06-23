import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { PostsController } from './posts/posts.controller';
import { HashtagsController } from './hashtags/hashtags.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    UsersController,
    PostsController,
    HashtagsController,
  ],
  providers: [AppService],
})
export class AppModule {}
