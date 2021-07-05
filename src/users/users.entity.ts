import { PasswordEntity } from 'src/auth/passwords.entity';
import { MooBaseEntity } from 'src/commons/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('users')
export class UserEntity extends MooBaseEntity {
  @Column({ length: 30, nullable: false, unique: true })
  username: string;

  @Column({ nullable: true, length: 50 })
  name: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true, length: 240 })
  bio?: string;

  @Column({ name: 'follower_count', default: 0 })
  followerCount: number;

  @Column({ name: 'followee_count', default: 0 })
  followeeCount: number;

  @Column('boolean', { default: false })
  verified: boolean;

  @OneToOne((type) => PasswordEntity, (password) => password.user, {
    lazy: true,
    cascade: true,
  })
  userPassword: PasswordEntity;
}
