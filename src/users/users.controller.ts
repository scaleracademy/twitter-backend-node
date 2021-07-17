import {
  Body,
  Delete,
  ForbiddenException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiParam,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/auth/auth.decorator';
import { RequiredAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

class UserCreateRequestBody {
  @ApiProperty() username: string;
  @ApiProperty() password: string;
  @ApiPropertyOptional() name?: string;
  @ApiPropertyOptional() avatar?: string;
  @ApiPropertyOptional() bio?: string;
}

class UserUpdateRequestBody {
  @ApiPropertyOptional() password?: string;
  @ApiPropertyOptional() name?: string;
  @ApiPropertyOptional() avatar?: string;
  @ApiPropertyOptional() bio?: string;
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/@:username')
  async getUserByUsername(@Param('username') username: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('/:userid')
  async getUserByUserid(@Param('userid') userid: string): Promise<UserEntity> {
    const user = await this.userService.getUserByUserId(userid);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post('/')
  async createNewUser(
    @Body() createUserRequest: UserCreateRequestBody,
  ): Promise<UserEntity> {
    const user = await this.userService.createUser(
      createUserRequest,
      createUserRequest.password,
    );
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Patch('/:userid')
  async updateUserDetails(
    @User() authdUser: UserEntity,
    @Param('userid') userid: string,
    @Body() updateUserRequest: UserUpdateRequestBody,
  ): Promise<UserEntity> {
    if (authdUser.id !== userid) {
      throw new ForbiddenException('You can only update your own user details');
    }
    const user = await this.userService.updateUser(userid, updateUserRequest);
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Put('/:userid/follow')
  async followUser(
    @User() follower: UserEntity,
    @Param('userid') followeeId: string,
  ): Promise<UserEntity> {
    const followedUser = await this.userService.createUserFollowRelation(
      follower,
      followeeId,
    );
    return followedUser;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:userid/follow')
  async unfollowUser(
    @User() follower: UserEntity,
    @Param('userid') followeeId: string,
  ): Promise<UserEntity> {
    const unfollowedUser = await this.userService.deleteUserFollowRelation(
      follower,
      followeeId,
    );
    return unfollowedUser;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Get('/:userid/followers')
  async getFollowersOfUser(): Promise<UserEntity[]> {
    return [];
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Put('/:userid/followees')
  async getFolloweesOfUser(): Promise<UserEntity[]> {
    return [];
  }
}
