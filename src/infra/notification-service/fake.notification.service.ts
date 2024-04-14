import {
  NotificationService,
  NotificationTrigger,
} from './notification.service.ts'
import * as console from 'node:console'
import uuid from 'react-native-uuid'

export class FakeNotificationService implements NotificationService {
  lastScheduledNotification: {
    title: string
    body: string
    trigger: NotificationTrigger
  }[] = []

  async sendPushNotification(message: string): Promise<void> {
    console.log(`Fake notification: ${message}`)
  }

  scheduleLocalNotification(
    title: string,
    body: string,
    trigger: NotificationTrigger,
  ): Promise<string> {
    this.lastScheduledNotification.push({
      title,
      body,
      trigger,
    })
    return Promise.resolve(String(uuid.v4()))
  }
}
