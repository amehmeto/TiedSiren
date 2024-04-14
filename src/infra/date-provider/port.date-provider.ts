export interface DateProvider {
  getNow(): Date
  getISOStringNow(): string
  recoverDate(timeInHHmm: string): Date
  toHHmm(date: Date): string
}
