import { MooBaseEntity } from 'src/commons/base.entity';
import { UserEntity } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('sessions')
export class SessionsEntity extends MooBaseEntity {
  @Column()
  userId: string;

  @JoinColumn({ name: 'userId' })
  @OneToOne(() => UserEntity)
  user: UserEntity;
}
