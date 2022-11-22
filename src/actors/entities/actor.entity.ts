import { Entity, Column, PrimaryGeneratedColumn, Table } from 'typeorm';

@Entity({name: 'actor'})
export class Actor {
  @PrimaryGeneratedColumn({ name: 'actor_id' })
  actorId: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'last_update', type: 'timestamp' })
  lastUpdate: Date;
}
