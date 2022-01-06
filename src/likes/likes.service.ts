import { BadRequestException, Injectable } from '@nestjs/common';
import { PostEntity } from 'src/posts/posts.entity';
import { UserEntity } from 'src/users/users.entity';
import { LikesEntity } from './likes.entity';
import { LikesRepository } from './likes.repository';

@Injectable()
export class LikesService {
  constructor(private likesRepository: LikesRepository) {}

  /**
   * @description like a post
   */
  async likePost(post: PostEntity, user: UserEntity): Promise<boolean> {
    const alreadyLiked = await this.getLikedPost(post.id, user.id);

    if (alreadyLiked) {
      return false;
    }

    const newLike = new LikesEntity();
    newLike.post = post;
    newLike.user = user;

    const savedLike = await this.likesRepository.save(newLike);
    return savedLike !== null;
  }

  /**
   * @description unlike a post
   */
  async unlikePost(postId: string, userId: string): Promise<boolean> {
    const likedPost = await this.getLikedPost(postId, userId);

    if (!likedPost) {
      return false;
    }

    const unlikePost = await this.likesRepository.delete(likedPost.id);
    return unlikePost.affected === 1;
  }

  /**
   * @description helper method to get a liked post
   */
  private async getLikedPost(
    postId: string,
    userId: string,
  ): Promise<LikesEntity> {
    if (!postId || !userId) {
      throw new BadRequestException(
        'Post can only be liked/unliked if both user id and post id is provided',
      );
    }

    return await this.likesRepository
      .createQueryBuilder('likes')
      .leftJoinAndSelect('likes.post', 'post')
      .leftJoinAndSelect('likes.user', 'user')
      .where(`post.id = :postId`, { postId })
      .where(`user.id = :userId`, { userId })
      .getOne();
  }
}
