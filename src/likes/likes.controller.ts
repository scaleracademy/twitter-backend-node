import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LikesService } from './likes.service';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
}
