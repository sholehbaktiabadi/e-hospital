import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeNow } from 'src/utilities/time';

@Entity({ name: 'doctor' })
export class Doctor {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column('varchar', { length: 60 })
  name: string;
  @Column('varchar', { length: 60 })
  title: string;
  @Column('simple-array', { nullable: true })
  spesialis: string[];
  @Column('varchar', { length: 60 })
  phone_number: string;
  @Column('varchar', { length: 60, unique: true, nullable: true })
  npa: string;
  @Column({
    type: 'timestamp without time zone',
    update: true,
    nullable: false,
    default: TimeNow(),
  })
  created_at: Date;
}
