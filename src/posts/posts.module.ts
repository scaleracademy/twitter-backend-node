import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesModule } from 'src/likes/likes.module';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepository]), LikesModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
