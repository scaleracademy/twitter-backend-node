import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { PostsController } from './posts/posts.controller';
import { HashtagsController } from './hashtags/hashtags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/users.entity';
import { PostEntity } from './posts/posts.entity';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { HashtagsModule } from './hashtags/hashtags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'mooadmin',
      password: 'moopass',
      database: 'moodb',
      synchronize: true,
      logger: 'advanced-console',
      logging: 'all',
      entities: [UserEntity, PostEntity],
    }),
    UsersModule,
    PostsModule,
    HashtagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
