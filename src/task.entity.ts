import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task_name: string;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ nullable: true })
  date: string;

  @Column({ default: 'Personal' })
  category: string;

  @Column({ default: false })
  isStarred: boolean;

  @Column({ default: 'guest' })
  username: string;
}
