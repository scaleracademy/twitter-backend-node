import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { PasswordEntity } from 'src/auth/passwords.entity';
import { SessionsEntity } from 'src/auth/sessions.entity';
import { PostsRepository } from 'src/posts/posts.repository';
import { UserFollowingEntity } from 'src/users/user-followings.entity';
import { UsersRepository } from 'src/users/users.repository';
import { MockPostsRepository } from './posts.repository.mock';
import { MockUsersRepository } from './users.repository.mock';

export const MockUsersRepositoryProvider = {
  provide: getCustomRepositoryToken(UsersRepository),
  useClass: MockUsersRepository,
};

export const MockUserFollowingsRepositoryProvider = {
  provide: getRepositoryToken(UserFollowingEntity),
  useValue: {},
};


export const MockPostsRepositoryProvider = {
  provide: getCustomRepositoryToken(PostsRepository),
  useClass: MockPostsRepository,
};

export const MockPasswordRepositoryProvider = {
  provide: getRepositoryToken(PasswordEntity),
  useValue: {},
};

export const MockSessionRepositoryProvider = {
  provide: getRepositoryToken(SessionsEntity),
  useValue: {},
};
