import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordEntity } from './passwords.entity';
import { SessionsEntity } from './sessions.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordEntity, SessionsEntity, UsersRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
