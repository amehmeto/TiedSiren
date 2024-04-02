import { RootState } from '../../_redux_/createStore.ts'
import { blockSessionAdapter } from '../block.session.ts'

export const selectBlockSessionById = (sessionId: string, state: RootState) =>
  blockSessionAdapter.getSelectors().selectById(state.blockSession, sessionId)
