import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/users.entity';
import { PostEntity } from './posts/posts.entity';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { AuthModule } from './auth/auth.module';
import { PasswordEntity } from './auth/passwords.entity';
import { SessionsEntity } from './auth/sessions.entity';
import { ConfigModule } from '@nestjs/config';
import { ProdDbModule } from './commons/db.module';
import { ApiModule } from './api.module';

 
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env.dev',
    }),
    TypeOrmModule.forRoot({
      host: process.env.DB_HOST,
      type: 'postgres',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logger: 'advanced-console',
      logging: 'all',
      entities: [UserEntity, PostEntity, PasswordEntity, SessionsEntity],
    }),
    UsersModule,
    PostsModule,
    HashtagsModule,
    AuthModule,
    ApiModule, ProdDbModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
