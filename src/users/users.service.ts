import { Injectable } from '@nestjs/common';
import { UserEntity } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepo: UsersRepository) {}
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
  public async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userRepo.save(user);
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
