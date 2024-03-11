export interface DateProvider {
  getNow(): Date

  getISOStringNow(): string
}
