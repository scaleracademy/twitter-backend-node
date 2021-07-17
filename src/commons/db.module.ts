import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordEntity } from 'src/auth/passwords.entity';
import { SessionsEntity } from 'src/auth/sessions.entity';
import { PostEntity } from 'src/posts/posts.entity';
import { UserFollowingEntity } from 'src/users/user-followings.entity';
import { UserEntity } from 'src/users/users.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'mooadmin',
      password: 'moopass',
      database: 'moodb',
      synchronize: true,
      logger: 'advanced-console',
      logging: 'all',
      entities: [
        UserEntity,
        PostEntity,
        PasswordEntity,
        SessionsEntity,
        UserFollowingEntity,
      ],
    }),
  ],
})
export class ProdDbModule {}

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'mooadmin',
      password: 'moopass',
      database: 'moodb_test',
      synchronize: true,
      dropSchema: true,
      logger: 'advanced-console',
      logging: 'all',
      entities: [
        UserEntity,
        PostEntity,
        PasswordEntity,
        SessionsEntity,
        UserFollowingEntity,
      ],
    }),
  ],
})
export class TestDbModule {}
