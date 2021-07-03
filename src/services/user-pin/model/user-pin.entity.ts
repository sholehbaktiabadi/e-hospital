import { User } from 'src/services/user-account/model/user-account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user_pin' })
export class UserPin {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('varchar', { name: 'user_pin', nullable: true, length: 6 })
  user_pin: string;

  @Column({
    type: 'timestamp without time zone',
    nullable: true,
    update: false,
    default: () => `(now())`,
  })
  created_at: Date;

  @OneToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user_id: User;
}
