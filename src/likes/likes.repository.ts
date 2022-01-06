import { EntityRepository, Repository } from 'typeorm';
import { LikesEntity } from './likes.entity';

@EntityRepository(LikesEntity)
export class LikesRepository extends Repository<LikesEntity> {}
