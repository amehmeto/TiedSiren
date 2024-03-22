import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../../../core/_redux_/createStore.ts'
import { blocklistAdapter } from '../../../../core/blocklist/blocklist.ts'
import {
  BlocklistViewModel,
  BlocklistViewModelType,
} from './blocklist-view-model.type.ts'

export const selectBlocklistViewModel = createSelector(
  [(rootState: RootState) => rootState.blocklist],
  (blocklist): BlocklistViewModelType => {
    const blocklists = blocklistAdapter.getSelectors().selectAll(blocklist)

    if (blocklists.length === 0) {
      return {
        type: BlocklistViewModel.NoBlocklist,
        message: 'Create your first blocklist to start planning block sessions',
      }
    }

    const formattedBlocklists = blocklists.map((blocklist) => {
      const { apps, websites, keywords } = blocklist.blocks
      const total = apps.android.length + websites.length + keywords.length

      return {
        id: blocklist.id,
        name: blocklist.name,
        totalBlocks: total.toString() + ' blocks',
      }
    })

    return {
      type: BlocklistViewModel.WithBlockLists,
      blocklists: formattedBlocklists,
    }
  },
)
