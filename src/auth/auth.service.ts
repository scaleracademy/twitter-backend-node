import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { UserEntity } from 'src/users/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import { Repository } from 'typeorm';
import { PasswordEntity } from './passwords.entity';
import { SessionsEntity } from './sessions.entity';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UsersRepository,
    @InjectRepository(PasswordEntity)
    private passwordRepo: Repository<PasswordEntity>,
    @InjectRepository(SessionsEntity)
    private sessionRepo: Repository<SessionsEntity>,
  ) {}

  public static PASSWORD_SALT_ROUNDS = 10;

  async createPasswordForNewUser(
    userId: string,
    password: string,
  ): Promise<PasswordEntity> {
    const existing = await this.passwordRepo.findOne({ where: { userId } });
    if (existing) {
      throw new UnauthorizedException(
        'This user already has a password, cannot set new password',
      );
    }

    const newPassword = new PasswordEntity();
    newPassword.userId = userId;
    newPassword.password = await this.passToHash(password);
    return await this.passwordRepo.save(newPassword);
  }

  async createNewSession(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('Username does not exist');
    }
    const userPassword = await this.passwordRepo.findOne({
      where: { userId: user.id },
    });
    const passMatch = await this.matchPassHash(password, userPassword.password);
    if (!passMatch) {
      throw new UnauthorizedException('Password is wrong');
    }
    const session = new SessionsEntity();
    session.userId = userPassword.userId;
    const savedSession = await this.sessionRepo.save(session);
    return savedSession;
  }

  async getUserFromSessionToken(token: string): Promise<UserEntity> {
    const session = await this.sessionRepo.findOne({ where: { id: token } });
    if (!session) {
      throw new UnauthorizedException('Session not found');
    }
    const user = await session.user;
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  private async passToHash(password: string): Promise<string> {
    return hash(password, AuthService.PASSWORD_SALT_ROUNDS);
  }

  private async matchPassHash(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return (await compare(password, hash)) === true;
  }
}
