import { DateProvider } from './port.date-provider.ts'

export class StubDateProvider implements DateProvider {
  now = new Date()

  getNow(): Date {
    return this.now
  }

  getISOStringNow(): string {
    return this.now.toISOString()
  }
}
