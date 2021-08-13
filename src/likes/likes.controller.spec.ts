import { Test, TestingModule } from '@nestjs/testing';
import { LikesController } from './likes.controller';
import { MockLikesModule } from './likes.module.mock';
import { LikesService } from './likes.service';

describe('LikesController', () => {
  let controller: LikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikesController],
      providers: [LikesService],
      imports: [MockLikesModule],
    }).compile();

    controller = module.get<LikesController>(LikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
