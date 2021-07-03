import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_account' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column('varchar', { length: 60, unique: true })
  username: string;
  @Column('varchar', { length: 60 })
  password: string;
  @Column('varchar', { length: 60 })
  email: string;
  @Column('varchar', { length: 60 })
  phone_number: string;
  @Column('varchar', { name: 'is_verified', length: 60, nullable: true })
  isVerified: boolean;
}
