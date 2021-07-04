import { Module } from '@nestjs/common';
import { HashtagsController } from './hashtags.controller';

@Module({
  controllers: [HashtagsController],
})
export class HashtagsModule {}
