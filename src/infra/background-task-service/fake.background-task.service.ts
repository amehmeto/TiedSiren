import {
  BackgroundTaskService,
  TaskOptions,
} from '../../core/ports/background-task.service.ts'

export class FakeBackgroundTaskService implements BackgroundTaskService {
  lastScheduledTasks: string[] = []

  async scheduleTask(taskName: string, options: TaskOptions): Promise<void> {
    this.lastScheduledTasks.push(taskName)
  }

  async cancelTask(taskId: string): Promise<void> {
    console.log('FakeBackgroundTaskService.cancelTask', taskId)
  }

  defineTask(
    taskName: string,
    taskFunction: () => Promise<void>,
  ): Promise<void> {
    return Promise.resolve(undefined)
  }

  initialize(): Promise<void> {
    return Promise.resolve(undefined)
  }
}
