import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

class LoginRequestBody {
  @ApiProperty() username: string;
  @ApiProperty() password: string;
}

class LoginResponseBody {
  @ApiProperty() token: string;
  constructor(token: string) {
    this.token = token;
  }
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ type: LoginResponseBody })
  @Post('/login')
  async login(@Body() body: LoginRequestBody) {
    const session = await this.authService.createNewSession(
      body.username,
      body.password,
    );
    return new LoginResponseBody(session.id);
  }
}
