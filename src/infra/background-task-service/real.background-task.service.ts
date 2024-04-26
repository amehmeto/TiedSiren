import {
  BackgroundTaskService,
  TaskOptions,
} from '../../core/block-session/ports/background-task.service.ts'
import BackgroundFetch from 'react-native-background-fetch'

export class RealBackgroundTaskService implements BackgroundTaskService {
  async scheduleTask(task: string, options?: TaskOptions): Promise<void> {
    console.log('scheduleTask', task, options)
    await BackgroundFetch.scheduleTask({
      taskId: task,
      delay: options?.parameters.delay ?? 0, // milliseconds
      stopOnTerminate: false,
      enableHeadless: true,
    })
  }

  async cancelTask(taskId: string): Promise<void> {
    await BackgroundFetch.stop(taskId)
  }
}
