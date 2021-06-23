import { Test, TestingModule } from '@nestjs/testing';
import { HashtagsController } from './hashtags.controller';

describe('HashtagsController', () => {
  let controller: HashtagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HashtagsController],
    }).compile();

    controller = module.get<HashtagsController>(HashtagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
