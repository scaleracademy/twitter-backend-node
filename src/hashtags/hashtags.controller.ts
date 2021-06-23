import { Param } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';

@Controller('hashtags')
export class HashtagsController {
  @Get('/')
  getHashtags(): string {
    // TODO: add actual logic
    return 'all top hashtags';
  }

  @Get('/:tag/posts')
  getPostsForHashtag(@Param() param): string {
    // TODO: add actual logic
    return `show all posts with hashtag ${param.tag}`;
  }
}
