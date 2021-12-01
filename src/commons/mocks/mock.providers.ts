import { getRepositoryToken } from '@nestjs/typeorm';
import { PasswordEntity } from 'src/auth/passwords.entity';
import { SessionsEntity } from 'src/auth/sessions.entity';
import { PostEntity } from 'src/posts/posts.entity';
import { UserFollowingEntity } from 'src/users/user-followings.entity';
import { UserEntity } from 'src/users/users.entity';
import { MockPostsRepository } from './posts.repository.mock';
import { MockUsersRepository } from './users.repository.mock';

export const MockUsersRepositoryProvider = {
  provide: getRepositoryToken(UserEntity),
  useValue: new MockUsersRepository(),
};

export const MockUserFollowingsRepositoryProvider = {
  provide: getRepositoryToken(UserFollowingEntity),
  useValue: {},
};

export const MockPostsRepositoryProvider = {
  provide: getRepositoryToken(PostEntity),
  useValue: new MockPostsRepository(),
};

export const MockPasswordRepositoryProvider = {
  provide: getRepositoryToken(PasswordEntity),
  useValue: {},
};

export const MockSessionRepositoryProvider = {
  provide: getRepositoryToken(SessionsEntity),
  useValue: {},
};
