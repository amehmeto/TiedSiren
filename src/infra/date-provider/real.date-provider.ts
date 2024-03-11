import { DateProvider } from './port.date-provider.ts'

export class RealDateProvider implements DateProvider {
  getISOStringNow(): string {
    return new Date().toISOString()
  }

  getNow(): Date {
    return new Date()
  }
}
