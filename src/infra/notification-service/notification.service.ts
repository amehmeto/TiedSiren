export interface NotificationService {
  pushNotification: (message: string) => Promise<void>
}
