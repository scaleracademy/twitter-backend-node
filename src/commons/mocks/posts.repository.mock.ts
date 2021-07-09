import { PostEntity } from 'src/posts/posts.entity';
import { Repository } from 'typeorm';

export class MockPostsRepository extends Repository<PostEntity> {}
