import {
  BackgroundTaskService,
  TaskOptions,
} from '../../core/block-session/ports/background-task.service.ts'

export class FakeBackgroundTaskService implements BackgroundTaskService {
  lastScheduledTasks: string[] = []

  async scheduleTask(task: string, options: TaskOptions): Promise<void> {
    this.lastScheduledTasks.push(task)
  }

  async cancelTask(taskId: string): Promise<void> {
    console.log('FakeBackgroundTaskService.cancelTask', taskId)
  }
}
