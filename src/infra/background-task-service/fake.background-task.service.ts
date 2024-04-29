import {
  BackgroundTaskService,
  TaskOptions,
} from '../../core/block-session/ports/background-task.service.ts'
import * as console from 'node:console'

export class FakeBackgroundTaskService implements BackgroundTaskService {
  lastScheduledTasks: string[] = []

  async scheduleTask(task: string, options: TaskOptions): Promise<void> {
    this.lastScheduledTasks.push(task)
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
