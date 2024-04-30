import {
  BackgroundTaskService,
  TaskOptions,
} from '../../core/block-session/ports/background-task.service.ts'
import * as TaskManager from 'expo-task-manager'
import { tieSirens } from '../../core/siren/usecases/tie-sirens.usecase.ts'
import * as BackgroundFetch from 'expo-background-fetch'
import { Platform } from 'react-native'
import { AppStore } from '../../core/_redux_/createStore.ts'

export class RealBackgroundTaskService implements BackgroundTaskService {
  defineTask(
    taskName: string,
    taskFunction: () => Promise<void>,
  ): Promise<void> {
    TaskManager.defineTask(taskName, taskFunction)
    return Promise.resolve()
  }

  async initialize(store: AppStore): Promise<void> {
    TaskManager.defineTask('tie-sirens', async () => {
      const now = Date.now()

      store.dispatch(tieSirens())
      console.log(
        `Got background fetch call at date: ${new Date(now).toISOString()}`,
      )
      /*
      // Be sure to return the successful result type!
      return BackgroundFetch.BackgroundFetchResult.NewData*/
    })
  }

  async scheduleTask(task: string, options?: TaskOptions): Promise<void> {
    if (Platform.OS === 'web') return

    return BackgroundFetch.registerTaskAsync('tie-sirens', {
      minimumInterval: 60 * 15, // 15 minutes
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    })
  }

  async cancelTask(taskId: string): Promise<void> {
    /*
    await BackgroundFetch.stop(taskId)
*/
  }
}
