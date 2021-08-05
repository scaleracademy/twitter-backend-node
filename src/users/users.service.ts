import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { UserFollowingEntity } from './user-followings.entity';
import { UserEntity } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepo: UsersRepository,
    private authService: AuthService,
    @InjectRepository(UserFollowingEntity)
    private userFollowRepo: Repository<UserFollowingEntity>,
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

    if (password.toLowerCase().includes('password'))
      throw new BadRequestException(
        'Password cannot contain the word password itself',
      );

    const usernameAlreadyExists = await this.getUserByUsername(user.username);
    if (usernameAlreadyExists)
      throw new ConflictException('This username is already taken!');

    const newUser = await this.userRepo.save(user);

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

  /**
   * create a user-user follow pairing
   */
  public async createUserFollowRelation(
    follower: UserEntity,
    followeeId: string,
  ) {
    const followee = await this.getUserByUserId(followeeId);
    if (!followee) {
      throw new NotFoundException('User not found');
    }
    const newFollow = await this.userFollowRepo.save({
      follower,
      followee,
    });
    return newFollow.followee;
  }

  /**
   * delete a user-user follow pairing
   */
  public async deleteUserFollowRelation(
    follower: UserEntity,
    followeeId: string,
  ) {
    const followee = await this.getUserByUserId(followeeId);
    if (!followee) {
      throw new NotFoundException('User not found');
    }
    const follow = await this.userFollowRepo.findOne({
      where: { follower, followee },
    });
    if (follow) {
      await this.userFollowRepo.delete(follow.id);
      // TODO: future: show show that I do not follow them anymore in the response
      return followee;
    } else {
      throw new NotFoundException('No follow relationship found');
    }
  }
}
