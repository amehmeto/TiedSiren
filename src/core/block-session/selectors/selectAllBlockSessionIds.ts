import { RootState } from '../../_redux_/createStore.ts'
import { blockSessionAdapter } from '../block.session.ts'

export const selectAllBlockSessionIds = (state: RootState) =>
  blockSessionAdapter.getSelectors().selectIds(state.blockSession)
