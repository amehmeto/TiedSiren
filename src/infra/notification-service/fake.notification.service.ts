import {
  NotificationService,
  NotificationTrigger,
} from './notification.service.ts'
import * as console from 'node:console'

export class FakeNotificationService implements NotificationService {
  async sendPushNotification(message: string): Promise<void> {
    console.log(`Fake notification: ${message}`)
  }

  scheduleLocalNotification(
    title: string,
    body: string,
    trigger: NotificationTrigger,
  ): Promise<string> {
    return Promise.resolve('')
  }
}
