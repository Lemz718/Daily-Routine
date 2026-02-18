import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async checkConnection(): Promise<string> {
    try {
      await this.taskRepo.query('SELECT 1');
      return 'Database connected successfully';
    } catch (error) {
      return `Database connection failed: ${error.message}`;
    }
  }

  async toggleStar(id: number): Promise<void> {
    const task = await this.taskRepo.findOneBy({ id: Number(id) });
    if (task) {
      task.isStarred = !task.isStarred;
      await this.taskRepo.save(task);
      console.log(`Task ${id} star status is now: ${task.isStarred}`);
    } else {
      console.log(`Task ${id} not found!`);
    }
  }

  async insert(body: any): Promise<Task> {
    return await this.taskRepo.save(body);
  }

  async findAll(username: string = 'guest'): Promise<Task[]> {
    return await this.taskRepo.find({
      where: { username: username || 'guest' },
      order: { isStarred: 'DESC', id: 'DESC' }
    });
  }

  async delete(id: number): Promise<void> {
    await this.taskRepo.delete(id);
  }

  async toggleComplete(id: number): Promise<void> {
    const task = await this.taskRepo.findOneBy({ id: Number(id) });
    if (task) {
      task.isCompleted = !task.isCompleted;
      await this.taskRepo.save(task);
    }
  }
}
