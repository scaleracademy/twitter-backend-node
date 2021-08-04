import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/users/users.entity';
import { PostEntity } from './posts.entity';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  /**
   * @description find all posts
   */
  async getAllPosts(
    authorId?: string,
    hashtags?: string[] | null,
  ): Promise<Array<PostEntity>> {
    // TODO: implementation pagination (size + limit)
    // TODO: implement filter by hashtag
    const queryBuilder = this.postsRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.author', 'author')
      .leftJoinAndSelect('posts.origPost', 'origPost')
      .addSelect('origPost.author')
      .leftJoinAndSelect('origPost.author', 'origPostAuthor')
      .leftJoinAndSelect('posts.replyTo', 'replyTo')
      .addSelect('replyTo.author')
      .leftJoinAndSelect('replyTo.author', 'replyToAuthor');

    if (authorId) {
      queryBuilder.where(`posts.author = :authorId`, { authorId });
    }

    if (hashtags && hashtags.length > 0) {
      // TODO
    }

    return queryBuilder
      .addSelect('posts.created_at')
      .orderBy('posts.created_at', 'DESC')
      .limit(100)
      .getMany();
  }

  /**
   * @description find post by id
   */
  async getPost(id: string): Promise<PostEntity> {
    return this.postsRepository.findOne(id, {
      relations: [
        'author',
        'origPost',
        'origPost.author',
        'replyTo',
        'replyTo.author',
      ],
    });
  }

  /**
   * @description delete post by id
   */
  async deletePost(id: string): Promise<boolean> {
    const deleteResult = await this.postsRepository.delete({ id });
    return deleteResult.affected === 1;
  }

  /**
   * @description create post
   */
  async createPost(
    post: Partial<PostEntity>,
    author: UserEntity,
    originalPostId: string,
    replyToPostId: string,
  ): Promise<PostEntity> {
    // TODO: detect #hashtags in the post and create hashtag entities for them
    // TODO: deletect @user mentions in the post
    if (!post.text && !originalPostId) {
      throw new BadRequestException('Post must contain text or be a repost');
    }

    if (originalPostId && replyToPostId) {
      throw new BadRequestException('Post can either be a reply or a repost');
    }

    const newPost = new PostEntity();
    newPost.text = post.text;
    newPost.author = author;

    if (originalPostId) {
      const origPost = await this.postsRepository.findOne(originalPostId);
      if (!origPost) {
        throw new NotFoundException('Original post not found');
      }
      newPost.origPost = origPost;
    }

    if (replyToPostId) {
      const replyTo = await this.postsRepository.findOne(replyToPostId);
      if (!replyTo) {
        throw new NotFoundException('Original post not found');
      }
      newPost.replyTo = replyTo;
    }

    const savedPost = await this.postsRepository.save(newPost);
    return savedPost;
  }
}
