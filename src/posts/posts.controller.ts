import {
  Body,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/auth.decorator';
import { RequiredAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/users/users.entity';
import { PostEntity } from './posts.entity';
import { PostsService } from './posts.service';

class PostCreateRequestBody {
  @ApiProperty() text: string;
}

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  getAllPosts(): string {
    // TODO
    return 'get all posts';
  }

  @Get('/:postid')
  getPostDetails(@Param('postid') postid: string): string {
    // TODO
    return `details of postid = ${postid}`;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Post('/')
  async createNewPost(
    @User() author: UserEntity,
    @Body() post: PostCreateRequestBody,
  ): Promise<PostEntity> {
    // TODO
    const createdPost = await this.postsService.createPost(post, author);
    return createdPost;
  }

  @Delete('/:postid')
  deletePost(@Param('postid') postid: string): string {
    // TODO
    return `delete postid = ${postid}`;
  }

  @Put('/:postid/like')
  likePost(@Param('postid') postid: string): string {
    return `liked post ${postid}`;
  }

  @Delete('/:postid/like')
  unlikePost(@Param('postid') postid: string): string {
    return `unliked post ${postid}`;
  }
}
