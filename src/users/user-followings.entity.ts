import { Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { MooBaseEntity } from 'src/commons/base.entity';
import { UserEntity } from './users.entity';

// there can be only 1 row of same follower+followee
@Unique('following_pair', ['follower', 'followee'])
@Entity('user_followings')
export class UserFollowingEntity extends MooBaseEntity {
  @JoinColumn({ name: 'follower_id' })
  @ManyToOne(() => UserEntity)
  follower: UserEntity;

  @JoinColumn({ name: 'followee_id' })
  @ManyToOne(() => UserEntity)
  followee: UserEntity;
}
