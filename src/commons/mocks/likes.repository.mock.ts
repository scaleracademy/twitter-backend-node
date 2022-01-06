import { LikesEntity } from 'src/likes/likes.entity';
import { Repository } from 'typeorm';

export class MockLikesRepository extends Repository<LikesEntity> {}
