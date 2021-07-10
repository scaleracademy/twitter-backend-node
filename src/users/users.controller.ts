import {
  Body,
  Delete,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/auth/auth.decorator';
import { RequiredAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

export class UserCreateRequestBody {
  @ApiProperty() username: string;
  @ApiProperty() password: string;
  @ApiPropertyOptional() name?: string;
  @ApiPropertyOptional() avatar?: string;
  @ApiPropertyOptional() bio?: string;
}

export class UserUpdateRequestBody {
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
  followUser(): string {
    return 'you followed user';
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:userid/follow')
  unfollowUser(): string {
    return 'you unfollowed user';
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Get('/:userid/followers')
  getFollowersOfUser(): string {
    return 'get followers of user';
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Put('/:userid/followees')
  getFolloweesOfUser(): string {
    return `get followees of given user`;
  }
}
