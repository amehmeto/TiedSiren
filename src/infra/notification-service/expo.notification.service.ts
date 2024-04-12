import * as Notifications from 'expo-notifications'
import { NotificationService } from './notification.service.ts'

export class ExpoNotificationService implements NotificationService {
  async getNotificationToken(): Promise<string> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      throw new Error('Failed to get push token for push notification!')
    }

    // Get the token that uniquely identifies this device
    const token = await Notifications.getExpoPushTokenAsync()
    return token.data
  }

  async pushNotification(message: string): Promise<void> {
    const token = this.getNotificationToken()
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: token,
        data: { extraData: 'Some extra data' },
        title: 'Notification title',
        body: message,
        sound: 'default',
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send push notification')
    }
  }
}
