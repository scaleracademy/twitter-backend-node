import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { PostsRepository } from 'src/posts/posts.repository';
import { UsersRepository } from 'src/users/users.repository';
import { MockPostsRepository } from './posts.repository.mock';
import { MockUsersRepository } from './users.repository.mock';

export const MockUsersRepositoryProvider = {
  provide: getCustomRepositoryToken(UsersRepository),
  useClass: MockUsersRepository,
};

export const MockPostsRepositoryProvider = {
  provide: getCustomRepositoryToken(PostsRepository),
  useClass: MockPostsRepository,
};
