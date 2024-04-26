export type TaskOptions = {
  taskName: string
  taskTitle: string
  taskDesc: string
  taskIcon: {
    name: string
    type: string
  }
  color: string
  linkingURI: string
  parameters: {
    delay: number
  }
}

export type Task = (options: TaskOptions) => Promise<void>

export interface BackgroundTaskService {
  scheduleTask(task: string, options?: TaskOptions): Promise<void>
  cancelTask(task: Task): Promise<void>
}
