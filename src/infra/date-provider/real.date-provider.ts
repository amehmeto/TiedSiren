import { DateProvider } from './port.date-provider.ts'

export class RealDateProvider implements DateProvider {
  getISOStringNow(): string {
    return new Date().toISOString()
  }
  getNow(): Date {
    return new Date()
  }
  recoverDate(timeInHHmm: string): Date {
    const [hours, minutes] = timeInHHmm.split(':').map(Number)

    const todayWithNewTime = new Date()
    todayWithNewTime.setUTCHours(hours, minutes)

    return todayWithNewTime
  }

  toHHmm(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }
}
