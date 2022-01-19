import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
