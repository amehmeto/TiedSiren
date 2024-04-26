import {
  BackgroundTaskService,
  Task,
  TaskOptions,
} from '../../core/block-session/ports/background-task.service.ts'

export class FakeBackgroundTaskService implements BackgroundTaskService {
  lastScheduledTasks: string[] = []

  async scheduleTask(task: string, options: TaskOptions): Promise<void> {
    console.log('FakeBackgroundTaskService.scheduleTask', task, options)
    this.lastScheduledTasks.push(task)
  }

  async cancelTask(task: Task): Promise<void> {
    console.log('FakeBackgroundTaskService.cancelTask', task)
  }
}
