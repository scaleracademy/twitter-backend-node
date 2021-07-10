import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/users.repository';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepository, UsersRepository])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
