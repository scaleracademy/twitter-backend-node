import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepo: UsersRepository,
    private authService: AuthService,
  ) {}
  /**
   * @description find a user with a given username
   * @returns {Promise<UserEntity>} user if found
   */
  public async getUserByUsername(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { username } });
  }

  /**
   * @description find a user with a given userid
   * @returns {Promise<UserEntity>} user if found
   */
  public async getUserByUserId(userId: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { id: userId } });
  }

  /**
   * @description create new user with given details
   * @returns {Promise<UserEntity>} user if created
   */
  public async createUser(
    user: Partial<UserEntity>,
    password: string,
  ): Promise<UserEntity> {
    if (user.username.length < 5)
      throw new BadRequestException('Username must be of minimum 5 characters');

    if (password.length < 8)
      throw new BadRequestException('Password must be of minimum 8 characters');

    if (password.toLowerCase() === 'password')
      throw new BadRequestException(
        'Password  not be the word password itself',
      );

    const newUser = await this.userRepo.save(user);
    // TODO: check for username/email existing and throw proper error
    // TODO: check username min length 5 chars - ✅
    // TODO: check password min length 8 chars - ✅

    await this.authService.createPasswordForNewUser(newUser.id, password);

    return newUser;
  }

  /**
   * @description update a user with given details
   * @returns {Promise<UserEntity>} user if updated
   */
  public async updateUser(
    userId: string,
    newUserDetails: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const existingUser = await this.userRepo.findOne({
      where: { id: userId },
    });
    if (!existingUser) {
      return null;
    }
    if (newUserDetails.bio) existingUser.bio = newUserDetails.bio;
    if (newUserDetails.avatar) existingUser.avatar = newUserDetails.avatar;
    if (newUserDetails.name) existingUser.name = newUserDetails.name;

    return await this.userRepo.save(existingUser);
  }
}
