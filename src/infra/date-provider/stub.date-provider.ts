import { DateProvider } from './port.date-provider.ts'

export class StubDateProvider implements DateProvider {
  now = new Date()
  timezoneOffset: number = this.now.getTimezoneOffset()

  getNow(): Date {
    return this.now
  }

  getISOStringNow(): string {
    return this.now.toISOString()
  }

  getTimezoneOffset(): number {
    return this.timezoneOffset
  }
}
