import { NotificationService } from './notification.service.ts'

export class FakeNotificationService implements NotificationService {
  async pushNotification(message: string): Promise<void> {
    console.log(`Fake notification: ${message}`)
  }
}
