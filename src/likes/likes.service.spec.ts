import { Test, TestingModule } from '@nestjs/testing';
import { MockLikesModule } from './likes.module.mock';
import { LikesService } from './likes.service';

describe('LikesService', () => {
  let service: LikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikesService],
      imports: [MockLikesModule],
    }).compile();

    service = module.get<LikesService>(LikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
