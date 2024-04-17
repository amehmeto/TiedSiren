export interface DateProvider {
  getNow(): Date
  getISOStringNow(): string
  recoverDate(timeInHHmm: string): Date
  recoverYesterdayDate(startedAt: string): Date
  toHHmm(date: Date): string
}
