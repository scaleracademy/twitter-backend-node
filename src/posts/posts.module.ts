import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesModule } from 'src/likes/likes.module';
import { PostsController } from './posts.controller';
import { PostEntity } from './posts.entity';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), LikesModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
