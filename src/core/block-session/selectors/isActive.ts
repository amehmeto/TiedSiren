import { DateProvider } from '../../../infra/date-provider/port.date-provider.ts'
import { BlockSession } from '../block.session.ts'
import { isBefore } from 'date-fns'

export function isActive(dateProvider: DateProvider, session: BlockSession) {
  const start =
    session.startedAt > session.endedAt
      ? dateProvider.recoverYesterdayDate(session.startedAt)
      : dateProvider.recoverDate(session.startedAt)
  const end = dateProvider.recoverDate(session.endedAt)
  const now = dateProvider.getNow()

  return !isBefore(now, start) && isBefore(now, end)
}
