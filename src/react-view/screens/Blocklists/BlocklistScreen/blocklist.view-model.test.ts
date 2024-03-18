import { describe, expect, test } from 'vitest'
import {
  BlocklistViewModel,
  selectBlocklistViewModel,
} from './blocklist.view-model.ts'
import { createTestStore } from '../../../../core/_tests_/createTestStore.ts'
import { stateBuilder } from '../../../../core/_tests_/state-builder.ts'
import { buildBlocklist } from '../../../../core/_tests_/data-builders/blocklist.builder.ts'

describe('Blocklists View Model', () => {
  test('Example: there is no blocklist', () => {
    const store = createTestStore({}, stateBuilder().build())
    const expectedViewModel = {
      type: BlocklistViewModel.NoBlocklist,
      message: 'Create your first blocklist to start planning block sessions',
    }

    const blocklistViewModel = selectBlocklistViewModel(store.getState())

    expect(blocklistViewModel).toStrictEqual(expectedViewModel)
  })

  test('Example: there is some blocklists', () => {
    const store = createTestStore(
      {},
      stateBuilder()
        .withBlocklists([
          buildBlocklist({
            id: 'blocklist-id-1',
            name: 'Distractions',
            blocks: {
              apps: {
                android: ['com.package.youtube'],
              },
              websites: [],
              keywords: [],
            },
          }),
          buildBlocklist({
            id: 'blocklist-id-2',
            name: 'Videos',
            blocks: {
              apps: {
                android: ['com.package.youtube', 'com.example.amazonprime'],
              },
              websites: ['dailymotion.fr'],
              keywords: ['cat videos'],
            },
          }),
        ])
        .build(),
    )

    const expectedViewModel = {
      type: BlocklistViewModel.WithBlockLists,
      blocklists: [
        {
          id: 'blocklist-id-1',
          name: 'Distractions',
          totalBlocks: '1 blocks',
        },
        {
          id: 'blocklist-id-2',
          name: 'Videos',
          totalBlocks: '4 blocks',
        },
      ],
    }

    const blocklistViewModel = selectBlocklistViewModel(store.getState())

    expect(blocklistViewModel).toStrictEqual(expectedViewModel)
  })
})
