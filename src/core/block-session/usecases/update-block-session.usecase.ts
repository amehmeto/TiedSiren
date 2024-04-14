import { BlockSession } from '../block.session.ts'
import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'
import { differenceInSeconds } from 'date-fns'

export type UpdateBlockSessionPayload = Partial<BlockSession> &
  Required<Pick<BlockSession, 'id'>>

export const updateBlockSession = createAppAsyncThunk(
  'blockSession/updateBlockSession',
  async (
    payload: UpdateBlockSessionPayload,
    { extra: { blockSessionRepository, notificationService, dateProvider } },
  ) => {
    /*    const now = dateProvider.getNow()

    const startedAt = dateProvider.recoverDate(payload.startedAt)
    const startNotificationId =
      await notificationService.scheduleLocalNotification(
        'Tied Siren',
        `Block session "${payload.name}" has started`,
        {
          seconds: differenceInSeconds(startedAt, now),
        },
      )
    const endNotificationId =
      await notificationService.scheduleLocalNotification(
        'Tied Siren',
        `Block session "${payload.name}" has ended`,
        {
          seconds: differenceInSeconds(endedAt, now),
        },
      )*/

    await blockSessionRepository.update(payload)
    return payload
  },
)
