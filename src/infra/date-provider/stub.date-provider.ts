import { DateProvider } from './port.date-provider.ts'

export class StubDateProvider implements DateProvider {
  now = new Date()

  getNow(): Date {
    return this.now
  }

  getISOStringNow(): string {
    return this.now.toISOString()
  }

  recoverDate(timeInHHmm: string): Date {
    const [hours, minutes] = timeInHHmm.split(':').map(Number)

    const todayWithNewTime = new Date(this.now.getTime())
    todayWithNewTime.setUTCHours(hours, minutes)

    return todayWithNewTime
  }

  toHHmm(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }
}
