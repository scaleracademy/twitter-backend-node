import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import { PostEntity } from './posts.entity';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private postsRepository: PostsRepository,
    private userRepository: UsersRepository,
  ) {}

  /**
   * @description find all posts
   */
  async getAllPosts(): Promise<Array<PostEntity>> {
    return this.postsRepository.find();
  }

  /**
   * @description find post by id
   */
  async getPost(id: string): Promise<PostEntity> {
    return this.postsRepository.findOne(id);
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
    user: UserEntity,
  ): Promise<PostEntity> {
    const author = await this.userRepository.findOne({
      where: { id: user.id },
    });
    const newPost = new PostEntity();
    newPost.text = post.text;
    newPost.author = author;
    const savedPost = await this.postsRepository.save(newPost);
    return savedPost;
  }
}
