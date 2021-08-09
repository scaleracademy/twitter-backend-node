import { MooBaseEntity } from 'src/commons/base.entity';
import { PostEntity } from 'src/posts/posts.entity';
import { UserEntity } from 'src/users/users.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('likes')
export class LikesEntity extends MooBaseEntity {
  @ManyToOne(() => PostEntity)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
