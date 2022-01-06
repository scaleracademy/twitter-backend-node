import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesController } from './likes.controller';
import { LikesRepository } from './likes.repository';
import { LikesService } from './likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([LikesRepository])],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
